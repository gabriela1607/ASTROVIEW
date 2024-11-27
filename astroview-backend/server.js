const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mysql = require("mysql2");


const app = express();
const PORT = 3000;
const SECRET_KEY = "sua_chave_secreta";

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", // Altere para o usuário do MySQL
    password: "root", // Altere para a senha do MySQL
    database: "astroview",
  });

  db.connect((err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
      return;
    }
    console.log("Conectado ao banco de dados MySQL!");
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cadastro
app.post('/api/cadastrar', async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body;

     if (!nome || !sobrenome || !email || !senha) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const query = "INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)";
    db.query(query, [nome, sobrenome, email, hashedPassword], (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar usuário:", err);
        return res.status(500).json({ message: "Erro ao cadastrar usuário." });
      }
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
});


//login
app.post("/login", (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
    return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
  }

  const query = "SELECT * FROM usuarios WHERE email = ?";
 
db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    const user = results[0];

    const isValidPassword = await bcrypt.compare(password, senha);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Usuário ou senha inválidos." });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user.id, username: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login bem-sucedido!", token });
  });
});

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token necessário" });
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ message: "Token inválido" });
      req.user = user;
      next();
    });
  }

app.get("/api/welcome", authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}!` });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
