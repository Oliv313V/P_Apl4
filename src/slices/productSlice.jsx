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
    'product/update', async ({ id, productData }) => {
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
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(registerProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload);
            });
    }
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
