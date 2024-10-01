import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import productionService from "../services/productionService.jsx";

export const fetchProduction = createAsyncThunk(
    'production/fetchAll',
    async () => {
        return await productionService.fetchProduction();
    }
);

export const register = createAsyncThunk(
    "production/register",
    async (productionData) => {
        return await productionService.createProduction(productionData);
    }
);

export const updateProductionData = createAsyncThunk(
    'production/update',
    async ({ id, productionData }) => {
        return await productionService.updateProductionData(id, productionData);
    }
);

export const deleteProduction = createAsyncThunk(
    'production/delete',
    async (id) => {
        await productionService.deleteProduction(id);
        return id; // Retorna apenas o id
    }
);

// Criação de slice para gerenciar produção
const productionSlice = createSlice({
    name: 'production',
    initialState: {
        productions: [],
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
            .addCase(fetchProduction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProduction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productions = action.payload; // Armazena no estado
            })
            .addCase(fetchProduction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.productions.push(action.payload);
            })
            .addCase(updateProductionData.fulfilled, (state, action) => {
                const index = state.productions.findIndex(production => production.id === action.payload.id);
                if (index !== -1) {
                    state.productions[index] = action.payload;
                }
            })
            .addCase(deleteProduction.fulfilled, (state, action) => {
                state.productions = state.productions.filter(production => production.id !== action.payload);
            });
    },
});

export const { reset } = productionSlice.actions;
export default productionSlice.reducer;