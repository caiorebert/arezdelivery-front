import axios from 'axios';

const API_URL = 'http://192.168.2.2:3000/opcoes';

// GET request
export const getOpcoes = async () => {
    try {
        const response = await axios.get('http://192.168.2.2:3000/opcoes');
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar opções:', error);
        throw error;
    }
};

// POST request
export const createOpcao = async (opcao: any) => {
    try {
        const response = await axios.post(API_URL, opcao);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar opção:', error);
        throw error;
    }
};

// PUT request
export const updateOpcao = async (id: string, opcao: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, opcao);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar opção:', error);
        throw error;
    }
};

// DELETE request
export const deleteOpcao = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar opção:', error);
        throw error;
    }
};