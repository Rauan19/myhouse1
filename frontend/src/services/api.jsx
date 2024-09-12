import axios from 'axios';

export const api = axios.create({
    baseURL: "http://localhost:4001/"
});
api.interceptors.response.use(
    response => response,
    error => {
        console.error('Interceptor error:', error.response); // Adicione um log detalhado aqui
        

        return Promise.reject(error);
    }
);
