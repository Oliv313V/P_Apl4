
import './Home.css';
//components
import { Link } from "react-router-dom";



const Home = () => {
    return (
        <div className="home-container">

            <h1>Bem-vindo ao Sistema para apontamentos de produção</h1>
            <p>Após o login: </p>
            <ul>
                <li><Link to="/admin">Gerenciar Usuários</Link></li>
                <li><Link to="/produto">Produto</Link></li>
                <li><Link to="/producao">Produção</Link></li>
                <li><Link to="/report">Relatório</Link></li>
            </ul>
        </div>
    );
};

export default Home;