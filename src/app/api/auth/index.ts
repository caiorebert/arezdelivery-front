import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const verifyToken = async (): Promise<boolean> => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzA1NTg3ODMsImV4cCI6MTczNTc0Mjc4M30.dHIwQ45OZ_vOKWb0hrM_wv-zV1QnpemkrSQ4Wq3Qw70`
            }
        }
        const response = await axios.get(`${API_URL}/logado`, config);
        return response.data.user !== null;
    } catch (error) {
        console.error('Login verification failed:', error);
        return false;
    }
};

export const login = async (email: string, senha: string): Promise<{ token: string } | null> => {
    try {
        const response = await axios.post(`${API_URL}/login`, { 
            email: email, 
            senha: senha 
        });
        if (response.status === 201) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
};