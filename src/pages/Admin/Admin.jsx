import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';

import { fetchUsers } from "../../slices/adminSlice.jsx";
import { reset } from "../../slices/authSlice.jsx";
import { updateUser } from "../../slices/adminSlice.jsx";
import { deleteUser } from "../../slices/adminSlice.jsx";

import { register } from "../../slices/adminSlice.jsx";


import Message from "../../components/Message";

import './Admin.css';

const Admin = () => {
    const [username, setName] = useState("");
    const [position, setTipo] = useState("");
    const [roleType, setRoleType] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.admin.users); // Selecionando a lista de usuários do slice

    useEffect(() => {
        const loadUsers = async () => {
            await dispatch(fetchUsers());
        };
        loadUsers();
        dispatch(reset());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        const user = { username, position, roleType, password };

        if (editMode) {
            // Atualizar usuário
            dispatch(updateUser({ id: currentUserId, user })).then(() => {
                resetForm();
                setEditMode(false);
                setCurrentUserId(null);
            });
        } else {
            // Criar novo usuário
            dispatch(register(user)).then(() => {               
                resetForm();
            });
        }
    };

    const handleEdit = (user) => {
        setName(user.username);
        setTipo(user.position);
        setRoleType(user.roleType);
        setEditMode(true);
        setCurrentUserId(user.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id)).then(() => {
            // Recarregar a lista de usuários
            dispatch(fetchUsers());
        });
    };

    const resetForm = () => {
        setName("");
        setTipo("");
        setPassword("");
        setConfirmPassword("");
    };

    const [isShow, setIsShow] = useState(false)

    const handlepassword = () => setIsShow(!isShow)

    return (

        <div id="gerenciar">
            <div className="formulario-cadastro">
                <h2>Admin - Cadastramento de usuários </h2>
                <p className="subtitle">{editMode ? "Editar Usuário" : "Insira credenciais para um novo usuário"}</p>
                <div className="form-group">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value={username} required />
                        <input type="text" placeholder="Cargo" onChange={(e) => setTipo(e.target.value)} value={position} required />
                        <input type="text" placeholder="Tipo de acesso" onChange={(e) => setRoleType(e.target.value)} value={roleType} required />
                        <label>
                            <input type={isShow ? "text" : "password"} placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} required />                            
                            <button onClick={handlepassword}>
                                {isShow && <EyeOff size={18} />}
                                {!isShow && <Eye size={18} />}
                            </button>
                        </label>
                        <input type="password" placeholder="Confirmar senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                        <input type="submit" value={editMode ? "Atualizar" : "Cadastrar"} disabled={loading} />
                        {loading && <p>Processando...</p>}
                        {error && <Message msg={error} type="error" />}
                    </form>
                </div>
            </div>

            <div className="users-container">
                <h3>Conferir usuários cadastrados</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.username} - {user.roletype}
                            <button onClick={() => handleEdit(user)}>Editar</button>
                            <button onClick={() => handleDelete(user.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
