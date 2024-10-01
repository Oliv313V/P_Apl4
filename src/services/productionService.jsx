import api from '../config/apiConfig.jsx';

const productionService = {
    fetchProduction: async () => {
        const response = await api.get('/production'); // Método para buscar produções
        return response.data;
    },

    createProduction: async (data) => {
        const response = await api.post('/production', data);
        return response.data;
    },

    updateProductionData: async (id, data) => {
        try {
            const response = await api.patch(`/production/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar dados de produção: ", error);
            throw error;
        }
    },

    deleteProduction: async (id) => {
        await api.delete(`/production/${id}`);
    },
};

export default productionService;