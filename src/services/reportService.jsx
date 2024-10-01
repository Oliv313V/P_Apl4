import axios from 'axios';

const reportService = {

    fetchReport: async () => {
    // Lógica para fazer a requisição, por exemplo, usando fetch ou axios
    const response = await fetch('/api/report'); // URL do seu endpoint
    if (!response.ok) {
        throw new Error('Erro ao buscar o relatório');
    }
    return await response.json(); // ou outra forma de processar a resposta
},


};
export default reportService;


export const BASE_URL = 'https://_confirmar nome da backend-apiiiii.com/api';


export const fetchReport = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/report`);
    return response.data
    } catch (error) {
        throw new Error ('Erro ao buscar relatório: ' + error.message);
    }
};





