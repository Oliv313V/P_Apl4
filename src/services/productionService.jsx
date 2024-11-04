import baseURL from '../config/configUrl.jsx';
import baseURLPDF from '../config/configUrlPdf.jsx';
import { saveAs } from 'file-saver';

const productionService = {
    fetchProduction: async () => {
        const response = await baseURL.get('/production');
        return response.data;
    },

    createProduction: async (productionData) => {
        const response = await baseURL.post('/production', productionData);
        return response.data;
    },

    updateProduction: async (id, productionData) => {
        try {
            const response = await baseURL.patch(`/production/${id}`, productionData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar dados de produção: ", error);
            throw error;
        }
    },

    deleteProduction: async (id) => {
        await baseURL.delete(`/production/${id}`);
    },

    fetchProductionPDF: async () => {
        try {            
            const response = await baseURLPDF.get('/production/pdf');
            const blob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(blob, 'production_report.pdf');
        } catch (error) {
            console.error('Erro ao baixar o PDF:', error);
        }
    },
};

export default productionService;