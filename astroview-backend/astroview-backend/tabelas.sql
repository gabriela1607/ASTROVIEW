CREATE DATABASE astroview;

USE astroview;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    sobrenome VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(10) NOT NULL
);


CREATE TABLE scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM users;



CREATE DATABASE astroview;
USE astroview;

CREATE TABLE ranking (
	posicao INT,
    nome VARCHAR(255) not null,
    pontuacao INT not null
);

SET @posicao = 0;

UPDATE ranking
JOIN (
    SELECT nome, pontuacao, @posicao := @posicao + 1 AS posicao
    FROM ranking
    ORDER BY pontuacao DESC
) AS ranking
ON ranking.nome = ranking.nome
SET ranking.posicao = ranking.posicao;

SELECT * FROM ranking;