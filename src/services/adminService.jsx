import baseURL from "../config/configUrl.jsx";
import {api , requestConfig } from "../config/config";

//Registrar usuário no sistema
const fetchUsers = async () => {
    const response = await baseURL.get('/user');
    if(!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
};



const createUser = async (userData) => {   
    const config = requestConfig("POST", userData);
    const response = await fetch(`${api}/user`, config);
    if(!response.ok) {
        throw new Error( 'Erro ao criar usuário');
    }
    return response.json();
};

const updateUser = async (id, userData) => {    
    const config = requestConfig("PUT", userData);
    const response = await fetch(`${api}/user/${id}`, config);
    if(!response.ok) {
        throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
};

const deleteUser = async (id) => { 
    const config = requestConfig("DELETE")   
    const response = await fetch (`${api}/user/${id}`, config);
    if(!response.ok) {
        throw new Error('Erro ao excluir usuário');
    }
    return id;
};

// INSERIDO POR GILSON
/*
const searchUser = async (userData) => {
    const config = requestConfig("GET", userData.username);
    const response = await fetch(config, baseURL + `/user/${userData.username}`);
    alert(userData.username + " " + userData.password);
    if(!response.ok) {
        throw new Error( 'Erro ao buscar usuário');
    }
    return response.json();
};
*/
// ATÉ AQUI

const adminService = {
    createUser,
    fetchUsers,    
    updateUser,
    deleteUser
};

export default adminService;

