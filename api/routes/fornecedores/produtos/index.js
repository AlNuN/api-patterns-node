const roteador = require('express').Router({ mergeParams: true });
const Tabela = require('./TabelaProduto');
const Produto = require('./Produto');
const Serializador = require('../../../Serializador').SerializadorProduto;

roteador.options('/', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
});

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
    res.set('Etag', produto.versao);
    res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
    res.set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`);
    res.status(201).send(serializador.serializar(produto));
  } catch (e) {
    next(e);
  }
});

roteador.options('/:id', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET, DELETE, HEAD, PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
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
    res.set('Etag', produto.versao);
    res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
    res.status(200).send(serializador.serializar(produto));
  } catch (e) {
    next(e);
  }
});

roteador.head('/:id', async (req, res, next) => {
  try{
    const dados = {
      id: req.params.id,
      fornecedor: req.fornecedor.id
    };
    const produto = new Produto(dados);
    await produto.um();
    res.set('Etag', produto.versao);
    res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
    res.status(200).end();
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
    await produto.um();
    res.set('Etag', produto.versao);
    res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

roteador.options('/:id/diminuir-estoque', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
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
    await produto.um();
    res.set('Etag', produto.versao);
    res.set('Last-Modified', new Date(produto.dataAtualizacao).getTime());
    res.status(204).end();
  } catch (e) {
    next(e);
  }

});


module.exports = roteador;