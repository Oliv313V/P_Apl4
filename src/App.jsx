import './App.css'


//Hooks
//import {useAuth} from "./hooks/useAuth.jsx";

//router - retornar com o Navigate, para dentro das chaves abaixo

import {BrowserRouter, Route, Routes} from "react-router-dom";

//components
import Navbar from "./components/Navbar";


//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
// import Usuario from './pages/Admin/UserList.jsx';
//import Report from './components/Report';
import Usuario from "./pages/Admin/Admin.jsx";
import Produto from "./pages/Apontamento/Product.jsx";
import Producao from "./pages/Apontamento/Production.jsx";
import Relatorio from "./pages/Apontamento/Report.jsx";


function App()  {

{/*Reativar após os testes
function App() {
    const { auth, loading } = useAuth();

    if (loading) {
        return <p>Carregando...</p>;
    }*/}

    return (
        <div className="App">
            <BrowserRouter>
                 <Navbar />
                <div className="container">
                    <Routes>
                        {/*<Route path="users/:id"
                                element={<Navigate to="./home"/>}
                        />
                        <Route path="/"
                               element={<Navigate to="./admin"/>}
                        />
                        <Route path="/home"
                            element={<Navigate to="./apontamento"/>}
                        />*/}
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        {/* <Route path="/admin" element={<Admin />} /> */}
                        <Route path="/usuario" element={<Usuario />} />
                        <Route path="/produto" element={<Produto />} />
                        <Route path="/producao" element={<Producao />} />
                        

                        {/* <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
                        <Route path="/admin" element={auth ? <Admin /> : <Navigate to="/login" />} />
                        <Route path="/UserList" element={auth ? <Admin /> : <Navigate to="/login" />} />
                        <Route path="/produto" element={auth ? <Produto /> : <Navigate to="/login" />} />
                        <Route path="/producao" element={auth ? <Production /> : <Navigate to="/login" />}
                       <Route path="/report" element={auth ? <Report /> : <Navigate to="/login" />} />
                        <Route path="/apontamento/:id" element={<Report />} />
                        <Route path="/report" element={<Report />} />*/}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
