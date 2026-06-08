const express = require('express');
const routes = express.Router();

const db = require('../db/connect');

// ==========================================
// GET - Listar empréstimos
// ==========================================
routes.get('/', async (req, res) => {

    try {

        const result = await db.query(`
            SELECT *
            FROM emprestimos
            ORDER BY id_emprestimo
        `);

        res.status(200).json(result.rows);

    } catch (error) {
        res.status(500).json({ mensagem: error.message });
    }

});

// ==========================================
// POST - Cadastrar empréstimo
// ==========================================
routes.post('/', async (req, res) => {

    try {

        const {
            id_usuario,
            id_exemplar,
            data_prevista_devolucao
        } = req.body;

        if (
            !id_usuario ||
            !id_exemplar ||
            !data_prevista_devolucao
        ) {
            return res.status(400).json({
                mensagem: 'Todos os campos são obrigatórios.'
            });
        }

        const sql = `
            INSERT INTO emprestimos
            (
                id_usuario,
                id_exemplar,
                data_prevista_devolucao
            )
            VALUES
            (
                $1, $2, $3
            )
            RETURNING *
        `;

        const valores = [
            id_usuario,
            id_exemplar,
            data_prevista_devolucao
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
// PUT - Atualizar empréstimo
// ==========================================
routes.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            id_usuario,
            id_exemplar,
            data_prevista_devolucao,
            data_devolucao
        } = req.body;

        const sql = `
            UPDATE emprestimos
            SET
                id_usuario = $1,
                id_exemplar = $2,
                data_prevista_devolucao = $3,
                data_devolucao = $4
            WHERE id_emprestimo = $5
            RETURNING *
        `;

        const valores = [
            id_usuario,
            id_exemplar,
            data_prevista_devolucao,
            data_devolucao,
            id
        ];

        const result = await db.query(sql, valores);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Empréstimo não encontrado.'
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
// DELETE - Excluir empréstimo
// ==========================================
routes.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(`
            DELETE FROM emprestimos
            WHERE id_emprestimo = $1
            RETURNING *
        `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                mensagem: 'Empréstimo não encontrado.'
            });
        }

        res.status(200).json({
            mensagem: 'Empréstimo excluído com sucesso.'
        });

    } catch (error) {
        res.status(500).json({
            mensagem: error.message
        });
    }

});

module.exports = routes;