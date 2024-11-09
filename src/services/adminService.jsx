import{api, requestConfig} from "../utils/config.jsx";
import baseURL from '../config/apiConfig.jsx';


//Registrar usuário no sistema
const fetchUsers = async () => {

    const response = await fetch(baseURL+'/users');
    if(!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
};

const createUser = async (userData) => {
    const config = requestConfig("POST", userData);
    const response = await fetch(config, baseURL + '/user');
    if(!response.ok) {
        throw new Error( 'Erro ao buscar usuário');
    }
    return response.json();
};

const updateUser = async (id, userData) => {
    const config = requestConfig("PUT", userData);
    const response = await fetch(`${baseURL}/user/${id}`, config);
    if(!response.ok) {
        throw new Error('Erro ao atualizar usuário');
    }
    return response.json();
};

const deleteUser = async (id) => {
    const config = requestConfig("DELETE", id);
    const response = await fetch(`${baseURL}/user/${id}`, config);
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
    createUser: async (userData) => {           
        const response = await baseURL.post('/user', userData);        
        return response.data;
    },

    // fetchUsers,    
    // updateUser,
    // deleteUser
};

export default adminService;