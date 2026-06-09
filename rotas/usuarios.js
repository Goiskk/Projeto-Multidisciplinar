const express = require('express');
const routes = express.Router();

const db = require('../db/connect');

// ==========================================
// GET - Listar usuários
// ==========================================
routes.get('/', async (req, res) => {

    try {

        const result = await db.query(`
            SELECT *
            FROM usuarios
            ORDER BY id_usuario
        `);

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            mensagem: error.message
        });

    }

});

// ==========================================
// POST - Cadastrar usuário
// ==========================================
routes.post('/', async (req, res) => {

    try {

        const {
            nome,
            email,
            telefone
        } = req.body;

        if (!nome || !email) {
            return res.status(400).json({
                mensagem: 'Nome e email são obrigatórios.'
            });
        }

        const sql = `
            INSERT INTO usuarios
            (
                nome,
                email,
                telefone
            )
            VALUES
            (
                $1, $2, $3
            )
            RETURNING *
        `;

        const valores = [
            nome,
            email,
            telefone
        ];

        const result = await db.query(sql, valores);

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            mensagem: error.message
        });

    }

});

// ==========================================
// PUT - Atualizar usuário
// ==========================================
routes.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            nome,
            email,
            telefone
        } = req.body;

        if (!nome || !email) {
            return res.status(400).json({
                mensagem: 'Nome e email são obrigatórios.'
            });
        }

        const sql = `
            UPDATE usuarios
            SET
                nome = $1,
                email = $2,
                telefone = $3
            WHERE id_usuario = $4
            RETURNING *
        `;

        const valores = [
            nome,
            email,
            telefone,
            id
        ];

        const result = await db.query(sql, valores);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            mensagem: error.message
        });

    }

});

// ==========================================
// DELETE - Excluir usuário
// ==========================================
routes.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(`
            DELETE FROM usuarios
            WHERE id_usuario = $1
            RETURNING *
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Usuário excluído com sucesso.'
        });

    } catch (error) {

        res.status(500).json({
            mensagem: error.message
        });

    }

});

module.exports = routes;