export class Opcao {
    id: number;
    nome: string;
    descricao?: string;
    preco: string;
    foto?: string;
    estabelecimento?: number;
    categoria?: number;

    constructor(
        id: number,
        nome: string,
        preco: string,
        descricao?: string,
        foto?: string,
        estabelecimento?: number,
        categoria?: number
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.foto = foto;
        this.estabelecimento = estabelecimento;
        this.categoria = categoria;
    }
}
