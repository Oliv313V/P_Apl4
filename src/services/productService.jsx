import baseURL from "../config/configUrl";


const productService = {

    getProducts: async () => {
        const response = await baseURL.get('/product'); // conferir se é esse mesmo o endponit
        return response.data;
    },
    addProduct: async (product) => {
        const response = await baseURL.post("/product", product);
        return response.data;
    },
    updateProduct: async ( id, product ) => {
        const response = await baseURL.patch(`/product/${id}`, product);
        return response.data;
    },
    deleteProduct: async (id) => {
        await baseURL.delete(`/product/${id}`);
    },
};
export default productService;