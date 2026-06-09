const express = require('express');
const routes = express.Router();

const db = require('../db/connect');

routes.get('/', async (req, res) => {

    const result = await db.query(`
        SELECT *
        FROM livros
        ORDER BY id_livro
    `);

    res.json(result.rows);
});

routes.post('/', async (req, res) => {

    const {
        titulo,
        autor,
        categoria
    } = req.body;

    const result = await db.query(
        `
        INSERT INTO livros
        (
            titulo,
            autor,
            categoria
        )
        VALUES
        (
            $1, $2, $3
        )
        RETURNING *
        `,
        [titulo, autor, categoria]
    );

    res.status(201).json(result.rows[0]);
});

module.exports = routes;