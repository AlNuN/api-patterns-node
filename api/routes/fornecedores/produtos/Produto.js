const Tabela = require('./TabelaProduto');
const DadosNaoFornecidos = require('../../../erros/DadosNaoFornecidos');
const CampoInvalido = require('../../../erros/CampoInvalido');

class Produto {
  constructor ({ id, titulo, preco, estoque, fornecedor,
     dataCriacao, dataAtualizacao, versao }) {
    this.id = id;
    this.titulo = titulo;
    this.preco = preco;
    this.estoque = estoque;
    this.fornecedor = fornecedor;
    this.versao = versao;
    this.dataAtualizacao = dataAtualizacao;
    this.dataCriacao = dataCriacao;
  }

  validar () {
    if (typeof this.titulo !== 'string' || this.titulo.length === 0) 
      throw new CampoInvalido('título');
    if (typeof this.preco !== 'number' || this.preco === 0)
      throw new CampoInvalido('preco');
  }

  async criar () {
    this.validar();
    const resultado = await Tabela.inserir({
      titulo: this.titulo,
      preco: this.preco,
      estoque: this.estoque,
      fornecedor: this.fornecedor,
    });

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async apagar () {
    return Tabela.remover(this.id, this.fornecedor);
  }

  async um () {
    const resultado = await Tabela.pegarPorId(this.id, this.fornecedor);
    this.titulo = resultado.titulo;
    this.preco = resultado.preco;
    this.estoque = resultado.estoque;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualizacao = resultado.dataAtualizacao;
    this.versao = resultado.versao;
  }

  async atualizar () {
    const dadosParaAtualizar = {}; 

    if (typeof this.titulo === 'string' && this.titulo.length > 0)
      dadosParaAtualizar.titulo = this.titulo;
    if (typeof this.preco === 'number' && this.preco > 0)
      dadosParaAtualizar.preco = this.preco;
    if (typeof this.estoque === 'number')
      dadosParaAtualizar.estoque = this.estoque;
    if (Object.keys(dadosParaAtualizar).length === 0)
      throw new DadosNaoFornecidos();
    return Tabela.atualizar(
      {
        id: this.id,
        fornecedor: this.fornecedor 
      },
      dadosParaAtualizar
    )
  }

  async diminuirEStoque() {
    return Tabela.subtrair(
      this.id,
      this.fornecedor,
      'estoque',
      this.estoque
    )
  }
}

module.exports = Produto;