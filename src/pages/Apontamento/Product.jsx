import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, registerProduct, updateProduct, deleteProduct, reset } from '../../slices/productSlice.jsx';
import Message from "../../components/Message";
import './Product.css';

const Product = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.product); // Corrigido para acessar o estado correto
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        const loadProducts = async () => {
            await dispatch(fetchProducts());
        };
        loadProducts();
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = { name, description };
        console.log('Produto a ser registrado:', product);

        if (editMode) {
            await dispatch(updateProduct({ id: currentProductId, productData: product })); // Mudança aqui
            resetForm();
            setEditMode(false);
            setCurrentProductId(null);
        } else {
            await dispatch(registerProduct(product));
            resetForm();
        }
    };

    const handleEdit = (product) => {
        setName(product.name);
        setDescription(product.description);
        setEditMode(true);
        setCurrentProductId(product.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id)).then(() => {
            dispatch(fetchProducts());
        });
    };

    const resetForm = () => {
        setName("");
        setDescription("");
    };

    return (
        <div id="gerenciar">
            <div className="formulario-cadastro">
                <h2>Cadastro de produtos</h2>
                <p className="subtitle">{editMode ? "Editar Produto" : "Insira informações para um novo produto"}</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nome do Produto" onChange={(e) => setName(e.target.value)} value={name} required />
                    <input type="text" placeholder="Descrição" onChange={(e) => setDescription(e.target.value)} value={description} required />
                    <input type="submit" value={editMode ? "Atualizar" : "Cadastrar"} disabled={loading} />
                    {loading && <p>Processando...</p>}
                    {error && <Message msg={error} type="error" />}
                </form>
            </div>

            <div className="products-container">
                <h3>Conferir produtos cadastrados</h3>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.description}
                            <button onClick={() => handleEdit(product)}>Editar</button>
                            <button onClick={() => handleDelete(product.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Product;
