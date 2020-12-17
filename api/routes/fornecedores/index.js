const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor;

roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(
    res.getHeader('Content-Type')
  );
  res.status(200).send(
    serializador.serializar(resultados)
  );
});

roteador.post('/', async (req, res, next) => {
  try{
    const data = req.body;
    const fornecedor = new Fornecedor(data);
    await fornecedor.criar();
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type')
    );
    res.status(201).send(
      serializador.serializar(fornecedor)
    );
  } catch (e) {
    next(e);
  }
});

roteador.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type'),
      [ 'email', 'dataCriacao', 'dataAtualizacao', 'versao' ]
    );
    res.status(200).send(
      serializador.serializar(fornecedor)
    );
  } catch (e) {
    next(e);
  }
});

roteador.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = { ...body, id };
    const fornecedor = new Fornecedor(data);
    await fornecedor.atualizar();
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

roteador.delete('/:id', async (req, res, next) => {
  try{
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    await fornecedor.remover(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

const roteadorProdutos = require('./produtos');

const verificarFornecedor = async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id });
    req.fornecedor = fornecedor;
    await fornecedor.um();
    next();
  } catch (e) {
    next(e);
  }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos);

module.exports = roteador;