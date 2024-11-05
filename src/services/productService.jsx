import baseURL from "../config/configUrl";

const fetchProducts = async () => {    
    const response = await baseURL.get(`/product`);
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
};

const createProduct = async (productData) => {    
    const response = await baseURL.post('/product', productData);
    setReports(response.data);
    setProductionData();
    if (!response.ok) {
        throw new Error('Erro ao criar produto');
    }
    return await response.json();
};

const updateProduct = async (id, productData) => {       
    const response = await baseURL.put(`/product/${id}`, productData);
    setReports(response.data);
    setProductionData();
    if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
    }        
    return response.json();
};

const deleteProduct = async (id) => {    
    const response = await baseURL.delete(`/product/${id}`, id);   
    if (!response.ok) {
        throw new Error('Erro ao deletar o produto');
    }
    return id;
};

const productService = {
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default productService;
