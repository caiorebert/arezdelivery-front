import { Opcao } from "./opcao";

export class Estabelecimento {
    id: number;
    nome: string;
    endereco: string;
    telefone: string;
    cnpj: string;
    tagnome: string;
    email: string;
    horarioFuncionamento?: string;
    categoria?: string;
    descricao?: string;
    foto?: string;
    website?: string;
    opcoes?: Opcao[];

    constructor(
        id: number,
        nome: string,
        endereco: string,
        telefone: string,
        cnpj: string,
        tagnome: string,
        email: string,
        horarioFuncionamento?: string,
        categoria?: string,
        descricao?: string,
        foto?: string,
        website?: string,
        opcoes?: Opcao[]
    ) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.telefone = telefone;
        this.cnpj = cnpj;
        this.tagnome = tagnome;
        this.email = email;
        this.horarioFuncionamento = horarioFuncionamento;
        this.categoria = categoria;
        this.descricao = descricao;
        this.foto = foto;
        this.website = website;
        this.opcoes = opcoes;
    }
}