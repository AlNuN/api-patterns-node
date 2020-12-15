const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.send(
    JSON.stringify(resultados)
  );
});

roteador.post('/', async (req, res) => {
  try{
    const data = req.body;
    const fornecedor = new Fornecedor(data);
    await fornecedor.criar();
  
    res.send(
      JSON.stringify(fornecedor)
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        mensagem: e.message
      })
    );
  }
})

roteador.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    res.send(
      JSON.stringify(fornecedor)
    )
  } catch (e) {
    res.send(
      JSON.stringify({
        mensagem: e.message
      })
    );
  }
})

roteador.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const data = { ...body, id };
    const fornecedor = new Fornecedor(data);
    await fornecedor.atualizar();
    res.send(
      JSON.stringify(fornecedor)
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        mensagem: e.message,
      })
    );
  }
})

roteador.delete('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const fornecedor = new Fornecedor({ id });
    await fornecedor.um();
    await fornecedor.remover(id);
    res.send(
      JSON.stringify({ id })
    );
  } catch (e) {
    res.send(
      JSON.stringify({
        mensagem: e.message,
      })
    );
  }
})

module.exports = roteador;