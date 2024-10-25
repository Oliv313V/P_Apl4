import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productService from "../services/productService.jsx";


export const fetchProduct = createAsyncThunk(
    'product/fetchAll',
    async () => {
        return await productService.getProducts();
    }
);

export const register = createAsyncThunk(
    "product/register",
    async (productData) => {
        return await productService.addProduct(productData);
    }
);

export const updateProductData = createAsyncThunk(
    'product/update',
    async ({ id, productData }) => {
        return await productService.updateProduct(id, productData);
    }
);

export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id) => {
        await productService.deleteProduct(id);
        return id; // Retorna apenas o id
    }
);

// Criação de slice para gerenciar produto
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        error: null,
        status: 'idle', // Para rastrear o estado
    },
    reducers: {
        reset: (state) => {
            state.error = null;
            state.status = 'idle'; // Reseta o estado
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload; // Armazena no estado
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProductData.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            });
    },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;