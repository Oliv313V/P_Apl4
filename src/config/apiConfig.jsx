{/* Podemos testar esse modo com axios também*/}
  import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',   // trocar pela base do backend
});
export default api;