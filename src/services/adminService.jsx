import baseURL from "../config/configUrl.jsx";

//Registrar usuário no sistema
const fetchUsers = async () => {
    const response = await baseURL.get('/users');
    if(!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
};

const createUser = async (userData) => {   
    const response = await baseURL.post('/user', userData);
    if(!response.ok) {
        throw new Error( 'Erro ao buscar usuário');
    }
    return response.json();
};

const updateUser = async (id, userData) => {    
    const response = await baseURL.put(`/user/${id}`, userData);
    if(!response.ok) {
        throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
};

const deleteUser = async (id) => {    
    const response = await baseURL.delete(`/user/${id}`, id);
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