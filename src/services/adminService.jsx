import { api, requestConfig } from "../utils/config.jsx";

// Registrar usuário no sistema
const fetchUsers = async () => {
    const response = await fetch(api + '/users', requestConfig('GET'));
    if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
};

const createUser = async (userData) => {
    const token = localStorage.getItem('token'); // Pegando o token do localStorage
    const config = requestConfig('POST', userData, token);
    const response = await fetch(api + '/users', config);
    if (!response.ok) {
        throw new Error('Erro ao criar usuário');
    }
    return response.json();
};

const updateUser = async (id, userData) => {
    const token = localStorage.getItem('token');
    const config = requestConfig('PUT', userData, token);
    const response = await fetch(`${api}/users/${id}`, config);
    if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
};

const deleteUser = async (id) => {
    const token = localStorage.getItem('token');
    const config = requestConfig('DELETE', null, token);
    const response = await fetch(`${api}/users/${id}`, config);
    if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
    }
    return id;
};

const adminService = {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
};

export default adminService;
