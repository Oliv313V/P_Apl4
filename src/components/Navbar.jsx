import "./Navbar.css";
import logo from '../assets/images/logo_itambe.png';

//Components
import { NavLink , Link } from "react-router-dom";
import {
    BsFillPeopleFill,
    BsFillHouseDoorFill,
    BsFillBoxFill,
    BsFillBarChartFill,
} from "react-icons/bs";

//Hooks
//import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Redux
import { logout, reset } from "../slices/authSlice.jsx";

const Navbar = () => {

    const { auth } = useAuth();
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const[ query, setQuery ] = useState("");

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/login");
    };


    return (
        <nav id="nav">
            <img src={logo}  alt="EffiNOTE 4.0" className="logo"/>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/" className={({isActive}) => (isActive ? 'active' : '')}>
                                <BsFillHouseDoorFill/> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin" className={({isActive}) => (isActive ? 'active' : '')}>
                                <BsFillPeopleFill/> Gerenciar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/apontamento" className={({isActive}) => (isActive ? 'active' : '')}>
                                <BsFillBoxFill/> Produto
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/report" className={({isActive}) => (isActive ? 'active' : '')}>
                                <BsFillBarChartFill/> Relatório
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/user/${user.id}`}>
                                    <BsFillPeopleFill/> Usuário
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <span onClick={handleLogout}>Sair</span>
                        </li>
                    </>
                ) : (
                    <li id="enter">
                        <Link to="/login">Entrar</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
