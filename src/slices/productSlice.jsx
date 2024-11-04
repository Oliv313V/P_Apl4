import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from "../services/productService.jsx";

export const fetchProducts = createAsyncThunk(
    'product/fetchAll', async () => {
        return await productService.fetchProducts();
    }
);

export const registerProduct = createAsyncThunk(
    "product/register", async (productData) => {
        return await productService.createProduct(productData);
    }
);

export const updateProduct = createAsyncThunk(
    'product/update', async ({ id, productData }) => { // Alteração para garantir que a estrutura está correta
        return await productService.updateProduct(id, productData);
    }
);

export const deleteProduct = createAsyncThunk(
    'product/delete', async (id) => {
        await productService.deleteProduct(id);
        return id;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        error: null,
        status: 'idle',
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Limpa o erro ao iniciar a busca
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Mensagem de erro
            })
            
            // Register Product
            .addCase(registerProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Limpa o erro ao registrar
            })
            .addCase(registerProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(registerProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Mensagem de erro
            })
    
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Limpa o erro ao atualizar
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Mensagem de erro
            })
    
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Limpa o erro ao excluir
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Mensagem de erro
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
