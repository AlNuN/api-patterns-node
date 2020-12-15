const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const roteador = require('./routes/fornecedores');

const port = config.get('api.port');

const app = express();

app.use(bodyParser.json());
app.use('/api/fornecedores', roteador);

app.listen(port, () => 
console.log(`A API está rodando no endereço http://localhost/${port}`));
