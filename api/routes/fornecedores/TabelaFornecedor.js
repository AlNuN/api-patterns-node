const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

module.exports = {
  listar () {
    return Modelo.findAll({ raw: true });
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
      throw new NaoEncontrado('Fornecedor', id);
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
  remover (id) {
    return Modelo.destroy({
      where: { id }
    });
  }
}