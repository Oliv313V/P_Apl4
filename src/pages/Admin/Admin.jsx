import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { fetchUsers, createUser, updateUser, deleteUser } from "../../slices/adminSlice.jsx";
import { reset } from "../../slices/authSlice.jsx";
import Message from "../../components/Message";
import './Admin.css';

const Admin = () => {
    const [name, setName] = useState("");
    const [tipo, setTipo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const users = useSelector((state) => state.admin.users); // Seleciona a lista de usuários do slice

    useEffect(() => {
        const loadUsers = async () => {
            try {
                await dispatch(fetchUsers()); // O fetchUsers já atualiza o estado global
            } catch (error) {
                console.error("Erro ao carregar usuários:", error);
            }
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

        const user = { name, tipo, password };

        if (editMode) {
            // Atualizar usuário
            dispatch(updateUser({ id: currentUserId, user })).then(() => {
                resetForm();
                setEditMode(false);
                setCurrentUserId(null);
            });
        } else {
            // Criar novo usuário
            dispatch(createUser(user)).then(() => {
                resetForm();
            });
        }
    };

    const handleEdit = (user) => {
        setName(user.name);
        setTipo(user.tipo);
        setEditMode(true);
        setCurrentUserId(user.id);
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id)).then(() => {
            dispatch(fetchUsers()); // Recarregar a lista de usuários após a exclusão
        });
    };

    const resetForm = () => {
        setName("");
        setTipo("");
        setPassword("");
        setConfirmPassword("");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div id="gerenciar">
            <div className="container-form">
                <h2>Admin <br /> Cadastramento de usuários</h2>
                <p className="subtitle">{editMode ? "Editar Usuário" : "Insira credenciais para um novo usuário"}</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label>
                            <span>Nome:</span>
                            <input
                                type="text"
                                placeholder="Nome"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </label>
                        <label>
                            <span>Tipo:</span>
                            <select name="tipo"
                                    onChange={(e) => setTipo(e.target.value)}
                                    value={tipo}
                            >
                                <option value="user">Usuário</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                        <label>
                            <span>Senha:</span>
                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Senha"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button className="eye" type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash className="icon" /> : <FaEye className="icon" />}
                                </button>
                            </div>
                        </label>
                        <label>
                            <span>Confirmar senha:</span>
                            <input
                                type="password"
                                placeholder="Confirmar senha"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            />
                        </label>

                        <input type="submit" value={editMode ? "Atualizar" : "Cadastrar"} disabled={loading} />
                        {loading && <p>Processando...</p>}
                        {error && <Message msg={error} type="error" />}
                    </div>
                </form>
            </div>

            <div>
                <h3>Conferir usuários cadastrados</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.tipo}
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

