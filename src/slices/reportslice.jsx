import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reportService from '../services/reportService';
// Certificar de que o caminho está correto


// Busca o relatório
export const getReport = createAsyncThunk('report/getReport', async () => {
    const data = await reportService.fetchReport(); // Chama a função correta
    return data;
});



const reportSlice = createSlice({
    name: 'report',
    initialState: {
        reportData: null,
        loading: false,
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.reportData = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReport.fulfilled, (state, action) => {
                state.loading = false;
                state.reportData = action.payload;
            })
            .addCase(getReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Armazena a mensagem de erro
            });
    },
});

export const { reset } = reportSlice.actions;
export default reportSlice.reducer;


