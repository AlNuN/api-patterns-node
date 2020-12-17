const modelos = [
  require('../routes/fornecedores/ModeloTabelaFornecedor'),
  require('../routes/fornecedores/produtos/ModeloTabelaProduto'),
];

async function createTables () {
  for (let c = 0; c < modelos.length; c += 1) {
    const modelo = modelos[c];
    await modelo.sync();
  }
}

createTables();
