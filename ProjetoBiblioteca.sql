CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_cadastro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE livros (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editora VARCHAR(100),
    ano_publicacao INTEGER,
    categoria VARCHAR(50)
);

CREATE TABLE exemplares (
    id_exemplar SERIAL PRIMARY KEY,
    id_livro INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'Disponível',

    FOREIGN KEY (id_livro)
    REFERENCES livros(id_livro)
);

CREATE TABLE emprestimos (
    id_emprestimo SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_exemplar INTEGER NOT NULL,

    data_emprestimo DATE DEFAULT CURRENT_DATE,
    data_prevista_devolucao DATE NOT NULL,
    data_devolucao DATE,

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_exemplar)
    REFERENCES exemplares(id_exemplar)
);



