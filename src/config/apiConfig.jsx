{/* Podemos testar esse modo com axios também*/}
import axios from 'axios';

const apiConfig = axios.create({
    baseURL: 'http://localhost:8080',   // trocar pela base do backend correto
});
export default apiConfig;

