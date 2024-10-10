export const api = "http://localhost:8080";
//precisa inserir/ confirmar o endereço certo

export const requestConfig = (method, data, token = null, task = null ) => {
    let config

    if (task) {
        config = {
            method,
            body:data,
            headers:{
                "Content-Type": "application/json"
            },
        }
    }else if(method ==="DELETE" || data === null) {
        config = {
            method,
            headers:{}
        };
    }else {
        config = {
            method,
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
    }

    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
};


{/* ou podemos testar esse config
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // trocar pela base do backend
});
export default api;
*/}