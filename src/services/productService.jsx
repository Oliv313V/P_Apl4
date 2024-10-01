import api from '../config/apiConfig.jsx';


const productService = {

    getProducts: async () => {
        const response = await api.get('/products'); // conferir se é esse mesmo o endponit
        return response.data;
    },
    addProduct: async (product) => {
        const response = await api.post("/products", product);
        return response.data;
    },
    updateProduct: async ( id, product ) => {
        const response = await api.patch(`/products/${id}`, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        await api.delete(`/products/${id}`);
    },
};
export default productService;