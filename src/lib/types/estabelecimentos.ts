import { Opcao } from "./opcao";

export interface Estabelecimento {
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
}