import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, reset } from "../../slices/adminSlice.jsx";

import './User.css'; // alterado por Gilson

const UserList = () => {
    const dispatch = useDispatch();
    const [ loading, error, users ] = useSelector((state) =>({
        loading: state.admin.loading,
        error: state.admin.error,
    }));

    useEffect(() => {
        const loadUsers = async () => {
            await dispatch(fetchUsers());
        };
        loadUsers();

        return() => {
            dispatch(reset());
        };
    }, [dispatch]);

    if (loading)  return<p className="error-message">Carregando usuários...</p>;
    if (error) return <p className="error-message">Erro: {error}</p>;

    return (
        <div className="user-list-container">
            <h2>Usuários cadastrados</h2>
            <ul className="user-list">
                { users.map(user => (
                    <li key={user.id}>{user.name} - {user.role} - {user.password}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;