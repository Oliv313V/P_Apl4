import api from '../config/apiConfig.jsx';


const productService = {

    getProducts: async () => {
        const response = await api.get('/product'); // conferir se é esse mesmo o endponit
        return response.data;
    },
    addProduct: async (product) => {
        const response = await api.post("/product", product);
        return response.data;
    },
    updateProduct: async ( id, product ) => {
        const response = await api.patch(`/product/${id}`, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        await api.delete(`/product/${id}`);
    },
};
export default productService;