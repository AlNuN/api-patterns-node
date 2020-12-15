const TabelaFornecedor = require('./TabelaFornecedor');

class Fornecedor {
  constructor({ id, empresa, email, categoria, dataCriacao,
    dataAtualizacao, versao }) {
      this.id = id;
      this.empresa = empresa;
      this.email = email;
      this.categoria = categoria;
      this.dataCriacao = dataCriacao;
      this.dataAtualizacao = dataAtualizacao;
      this.versao = versao;
  }

  async criar() {
    const resultado = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria,
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async um() {
    const encontrado = await TabelaFornecedor.encontrarPorId(this.id);

    this.empresa = encontrado.empresa;
    this.email = encontrado.email;
    this.categoria = encontrado.categoria;
    this.dataCriacao = encontrado.dataCriacao;
    this.dataAtualizacao = encontrado.dataAtualizacao;
    this.versao = encontrado.versao;
  }
}

module.exports = Fornecedor;