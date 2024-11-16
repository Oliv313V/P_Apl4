import {api , requestConfig } from "../config/config";

const fetchProducts = async () => {
    const response = await fetch(`${api}/product`);
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
};

const createProduct = async (productData) => {
    const config = requestConfig("POST", productData);
    const response = await fetch(`${api}/product`, config);
    if (!response.ok) {
        throw new Error('Erro ao criar produto');
    }   
    return response.json();
};

const updateProduct = async (id, productData) => {
    const config = requestConfig("PUT", productData);
    const response = await fetch(`${api}/product/${id}`, config);
    if (!response.ok) {
        throw new Error('Erro ao atualizar produto');
    }   
    return response.json();
};

const deleteProduct = async (id) => {
    const config = requestConfig("DELETE");
    const response = await fetch(`${api}/product/${id}`, config);
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
