/**
 * Servidor back-end utilizando o módulo Express para criar uma API REST
 * e realizar as operações de CRUD no banco de dados PostgreSQL.
 */

const express = require('express');
const app = express();

require('dotenv').config();

const hostname = process.env.APP_HOST;
const port = process.env.APP_PORT;

// Importação das rotas
const clienteRotas = require('./rotas/cliente');
const usuarioRotas = require('./rotas/usuarios');
const emprestimoRotas = require('./rotas/emprestimos');
const livroRotas = require('./rotas/livros');

// Middleware para JSON
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
    res.status(200).send('Servidor API REST.');
});

// Expor as rotas

app.use('/cliente', clienteRotas);
app.use('/usuarios', usuarioRotas);
app.use('/emprestimos', emprestimoRotas);
app.use('/livros', livroRotas);

// Inicialização do servidor
app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
});