import { Opcao } from "./opcao";

export interface Pedido {
    id: number;
    opcao: Opcao;
    quantidade: number;
}