import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

//components
import Navbar from "./components/Navbar";


//pages
import Home from "./pages/Home/Home";
import Usuario from "./pages/Admin/Admin.jsx";
import Produto from "./pages/Apontamento/Product.jsx";
import Producao from "./pages/Apontamento/Production.jsx";



function App()  {

    return (
        <div className="App">
            <BrowserRouter>
                 <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/usuario" element={<Usuario />} />
                        <Route path="/produto" element={<Produto />} />
                        <Route path="/producao" element={<Producao />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
