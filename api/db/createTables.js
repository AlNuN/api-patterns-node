const ModeloTabela = require('../routes/fornecedores/ModeloTabelaFornecedor');

ModeloTabela.sync()
  .then(() => console.log('Tabela Criada com sucesso'))
  .catch(console.error);
