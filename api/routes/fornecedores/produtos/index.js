const roteador = require('express').Router({ mergeParams: true });
const Tabela = require('./TabelaProduto');
const Produto = require('./Produto');
const Serializador = require('../../../Serializador').SerializadorProduto;

roteador.get('/', async (req, res) => {
  const produtos = await Tabela.listar(req.fornecedor.id);
  const serializador = new Serializador(
    res.getHeader('Content-Type')
  );
  res.status(200).send(serializador.serializar(produtos));
});

roteador.post('/', async (req, res, next) => {
  try {
    const idFornecedor = req.fornecedor.id;
    const corpo = req.body;
    const dados = {...corpo, fornecedor: idFornecedor};
    const produto = new Produto(dados);
    await produto.criar();
    const serializador = new Serializador(
      res.getHeader('Content-Type')
    );
    res.status(201).send(serializador.serializar(produto));
  } catch (e) {
    next(e);
  }
});

roteador.delete('/:id', async (req, res) => {
  const dados = {
    id: req.params.id,
    fornecedor: req.fornecedor.id
  };
  const produto = new Produto(dados);
  await produto.apagar();
  res.status(204).end();
});

roteador.get('/:id', async (req, res, next) => {
  try{
    const dados = {
      id: req.params.id,
      fornecedor: req.fornecedor.id
    };
    const produto = new Produto(dados);
    await produto.um();
    const serializador = new Serializador(
      res.getHeader('Content-Type'),
      [ 'preco', 'estoque', 'fornecedor', 'dataCriacao', 'dataAtualizacao' ]
    );
    res.status(200).send(serializador.serializar(produto));
  } catch (e) {
    next(e);
  }
});

roteador.put('/:id', async (req, res, next) => {
  try {
    const dados = {
      ...req.body,
      id: req.params.id,
      fornecedor: req.fornecedor.id
    };
    const produto = new Produto(dados);
    await produto.atualizar();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

roteador.post('/:id/diminuir-estoque', async (req, res, next) => {
  try {
    const produto = new Produto({
      id: req.params.id,
      fornecedor: req.fornecedor.id
    });
    await produto.um()
    produto.estoque = produto.estoque - req.body.quantidade;
    await produto.diminuirEStoque();
    res.status(204).end();
  } catch (e) {
    next(e);
  }

});


module.exports = roteador;