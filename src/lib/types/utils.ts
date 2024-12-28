export interface SnackBarAlerta {
    tipo: number;
    retorno: string;
    severity: string;
}

export interface Alerta {
    tipo: number;
    severity: string;
    retorno: string;
    handle: any;
}