import {useEffect, useState} from "react";

import productService from "../../services/productService.jsx";


import './Product.css';
import * as console from "react-dom/test-utils";
import Message from "../../components/Message.jsx";


const Product = () => {
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [loading, setLoading] = useState(false); // Estado de loading
    const [error, setError] = useState(null); // Estado de erro

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const productData = await fetchProducts(); // Chama a função para buscar produtos
                setProducts(productData); // Atualiza o estado
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadProducts(); // Chama a função para buscar produtos? Falta
    }, []);

    const fetchProducts = async () => {
        try {
            return await productService.getProducts();
        } catch (error) {
            console.error('Erro ao buscar produtos', error);
            throw error; // Propaga o erro para o useEffect
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await productService.addProduct({ name: productName, type: productType });
            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
            setProductName("");
            setProductType("");
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatedProduct = async (id) => {
        const updatedData = {
            name: productName,
            type: productType,
        };
        try {
            const updatedProduct = await productService.updateProduct(id, updatedData);
            console.log('Produto atualizado:', updatedProduct);
            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Erro ao atualizar produto!', error);
            setError(error.message);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await productService.deleteProduct(id);
            const updatedProducts = await fetchProducts();
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Erro ao excluir produto', error);
            setError(error.message);
        }
    };

    return (
        <div id="product">
            <div className="product-container">
                <h2>Gerenciar produtos</h2>
                <p className="product-subtitle">Insira o novo produto</p>
                <form className="product-form" onSubmit={handleAddProduct}>
                    <label htmlFor="productName">Produto: </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    /><br />

                    <label htmlFor="productType"> Tipo de Produto: </label>
                    <input
                        type="text"
                        id="productType"
                        name="productType"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                        required
                    />
                    <button type="submit">Adicionar Produto</button>
                    {loading && <p>Processando...</p>}
                    {error && <Message msg={error} type="error" />}
                </form>
            </div>
            <div className="productsIn-container">
                <h3>Produtos Cadastrados</h3>
                <ul>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <li key={product.id}>
                                {product.name} - {product.type}
                                <button onClick={() => handleUpdatedProduct(product.id)}>Atualizar</button>
                                <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
                            </li>
                        ))
                    ) : (
                        <li>Nenhum produto cadastrado!</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Product;
