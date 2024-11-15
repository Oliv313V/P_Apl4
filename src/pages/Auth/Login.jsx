import "./Auth.css";

import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import {useAuth} from "../../hooks/useAuth.jsx";

import { searchUser } from "../../slices/adminSlice.jsx"; // Incluido por Gilson

import adminSlice from "../../slices/adminSlice.jsx"; // Incluido por Gilson


const Login = () => {

    const dispatch = useDispatch(); // incluido por Gilson

    // Para armazenar as entradas do usuário
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const { login } = useAuth();
    //ver essa parte
    const [ setError] = useState(null);
    //const [ error, setError] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();
       setError(null); //reseta o erro antes de nova tentativa  (comentar - retirado por Gilson no teste da tela Login)
       const user = { username, password}; // incluido por Gilson
        
       try{
        //Inserido por Gilson
        /*
        alert(user.username + " " + user.password);
        const resultBD = (await dispatch(searchUser(user)));
        alert(resultBD.username + " " + resultBD.password);

        if (passwordBD.password == password) {
            alert("sucesso!");
        } else {
            alert("Fracasso!");
        }
        */
        // Até aqui

        //comentar - comentado por Gilson

            const response = await axios.post("https://localhost:8080/api/auth/login", {
                username,
                password,
            });

            alert("Sending data");
            //chama a função login do context
            login(response.data);
        // até aqui
        
        }  catch (error) {
            console.error('Erro ao fazer login: ', error);
            console.error('Detalhes do erro:', error.response); //Mostra detalhes do erro
            setError('Credenciais inválidas. Tente novamente.'); //Atualiza o estado de erro
        }
    };

    // value={username} incluido por Gilson após o setUserName
    // value={password} incluido por Gilson após o setPassword



    return (
        <div className="login-container">
            <form  className="login-form" onSubmit={handleSubmit}>
                <h1>Acesso ao sistema</h1>
                <div className="input-field">
                    <input type="text"  placeholder="Usuário"
                           onChange={(e) => setUserName(e.target.value)}  required={true}/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-field">
                    <input type="password"  placeholder="Senha"
                           onChange={(e) => setPassword(e.target.value)}   required={true} />
                    <FaLock className="icon"/>
                </div>

                <button type="submit">Entrar</button>

                <div>
                    <p>Sistema para apontamentos de produção.</p>
                </div>

            </form>
        </div>
    );
};

export default Login;