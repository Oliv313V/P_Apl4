import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from "../services/authService";

//Buscar Mensagens de erro no back
//import { Message } from "../components/Message.jsx";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    error: null,
    success: false,
    loading: false,
};


// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

// Login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        const data = await authService.login(user);
        if (data.error) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;