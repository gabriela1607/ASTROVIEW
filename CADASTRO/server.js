const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;

    const newUser = { nome, email, senha };
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao ler o arquivo.' });
        }

        const users = JSON.parse(data || '[]');
        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao salvar o usuário.' });
            }

            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
