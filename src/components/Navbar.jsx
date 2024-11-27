import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsFillHouseDoorFill, BsFillPeopleFill, BsFillBoxFill, BsFillGearFill, BsSearch } from 'react-icons/bs';
import { BsFillGridFill } from 'react-icons/bs'; 
import logo from "../assets/images/logo_itambe.png";
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav id="nav">
      <img src={logo} alt="Itambé" className="logo" />
      <ul id="nav-links" className={isMenuOpen ? 'active' : ''}>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillHouseDoorFill /> HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/usuario" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillPeopleFill />  GERENCIAR USUÁRIO
          </NavLink>
        </li>
        <li>
          <NavLink to="/produto" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillBoxFill /> PRODUTO
          </NavLink>
        </li>
        <li>
          <NavLink to="/producao" className={({ isActive }) => (isActive ? 'active' : '')}>
            <BsFillGearFill />  PRODUÇÃO
          </NavLink>
        </li>
        <li>
          <button className="search-button" onClick={toggleSearch}>
            <BsSearch />
          </button>
          <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
            <input type="text" placeholder="Pesquisar" />
          </div>
        </li>
      </ul>
      <button className="menu-button" onClick={toggleMenu}>
        <BsFillGridFill />
      </button>
    </nav>
  );
}

export default Navbar;
