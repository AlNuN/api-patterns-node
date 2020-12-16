const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.status(200).json(resultados);
});

roteador.post('/', async (req, res) => {
  try{
    const data = req.body;
    const fornecedor = new Fornecedor(data);
    await fornecedor.criar();
    res.status(201).json(fornecedor);
  } catch (e) {
    res.status(400).json({ mensagem: e.message })
  }
});

roteador.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    res.status(200).json(fornecedor);
  } catch (e) {
    res.status(404).json({ mensagem: e.message });
  }
});

roteador.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = { ...body, id };
    const fornecedor = new Fornecedor(data);
    await fornecedor.atualizar();
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ mensagem: e.message });
  }
});

roteador.delete('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    await fornecedor.remover(id);
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ mensagem: e.message });
  }
});

module.exports = roteador;