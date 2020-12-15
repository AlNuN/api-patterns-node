const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
  listar () {
    return Modelo.findAll();
  },
  inserir (fornecedor) {
    return Modelo.create(fornecedor);
  },
  async encontrarPorId (id) {
    const encontrado = await Modelo.findOne({
      where: {
        id,
      }
    });
    if (!encontrado) {
      throw new Error(`Fornecedor de id ${id} não encontrado`);
    }
      return encontrado;
  },
  atualizar (id, data) {
    return Modelo.update(
      data,
      {
        where: { id }
      },
    );
  },
}