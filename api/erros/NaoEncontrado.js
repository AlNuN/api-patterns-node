class NaoEncontrado extends Error {
  constructor(nome, id) {
    super(`${nome} de id ${id} não encontrado`);
    this.name = 'NaoEncontrado';
    this.idErro = 0;
  }
}

module.exports = NaoEncontrado;