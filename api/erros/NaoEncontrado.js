class NaoEncontrado extends Error {
  constructor(id) {
    super(`Fornecedor de id ${id} não encontrado`);
    this.name = 'NaoEncontrado';
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;