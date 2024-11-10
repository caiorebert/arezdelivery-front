const API_URL = process.env.PROD || 'http://localhost:3000/estabelecimentos';

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

export async function getOpcoesByEstabelecimento(id:number) {
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