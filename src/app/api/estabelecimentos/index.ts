import { Opcao } from "../../../lib/types/opcao";

const API_URL =  process.env.NEXT_PUBLIC_API_URL + '/estabelecimentos';

export async function getEstabelecimentos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching estabelecimentos:', error);
        throw error;
    }
}

export async function getEstabelecimentoByName(nome:string) {
    try {
        const response = await fetch(`${API_URL}/${nome}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const opcoes = await getOpcoesByEstabelecimento(data.id);
        data.opcoes = opcoes;
        return data;
    } catch (error) {
        console.error('Error fetching estabelecimentos:', error);
        throw error;
    }
}

export async function getOpcoesByEstabelecimento(id:number): Promise<Opcao[]> {
    try {
        const response = await fetch(`${API_URL}/${id}/opcoes`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching opcoes:', error);
        throw error;
    }
}

export async function getCategoriasByEstabelecimento(id:number) {
    try {
        const response = await fetch(`${API_URL}/${id}/categorias`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categorias:', error);
        throw error;
    }
}

export async function createEstabelecimento(estabelecimento: any) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estabelecimento)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating estabelecimento:', error);
        throw error;
    }
}

export async function updateEstabelecimento(id: string, estabelecimento: any) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estabelecimento)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating estabelecimento:', error);
        throw error;
    }
}

export async function deleteEstabelecimento(id: number) {
    try {
        const response = await fetch(`${API_URL}/${id.toString()}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting estabelecimento:', error);
        throw error;
    }
}