import axios from 'axios';

export const api = axios.create({
    baseURL: "https://myhouse1-1.onrender.com/"
});
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Interceptor error:', error.response); // Adicione um log detalhado aqui
        

        return Promise.reject(error);
    }
);
