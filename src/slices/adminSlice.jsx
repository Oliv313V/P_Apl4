import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import adminService from "../services/adminService.jsx";


export const fetchUsers = createAsyncThunk(
    'users/fetchAll', async () => {
        return await  adminService.fetchUsers();
    });

export const register = createAsyncThunk(
    "users/register", async ( userData ) => {
   return await adminService.createUser(userData);
    });

export const updateUser = createAsyncThunk(
    'users/update', async ({id, userData} ) => {
        return await adminService.updateUser(id, userData);
    });

export const deleteUser = createAsyncThunk(
    'users/delete', async(id) => {
        await adminService.deleteUser(id);
        return id;
    });


//criação de slice para gerenciar usuários
const adminSlice = createSlice ({
    name: 'users',
    initialState: {
        users: [],
        error: null,
    },
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.staus = 'succeeded';
                state.users = action.payload; //armazena no estado
            })
                .addCase(fetchUsers.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                })
            .addCase(register.fulfilled, (state, action) => {
            state.users.push(action.payload);
        })
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if(index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter (user => user.id !== action.payload.id);
            });
    },
});

export const  { reset } = adminSlice.actions;
export default adminSlice.reducer;
