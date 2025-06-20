import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/vipra-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#hero"><img src={logo} alt="VipraCo Logo" className="navbar-logo-img" /></a>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="#hero" onClick={toggleMenu}>Home</a>
        <a href="#features" onClick={toggleMenu}>Features</a>
        <a href="#how-it-works" onClick={toggleMenu}>How It Works</a>
        <a href="#vobot" onClick={toggleMenu}>vObot</a>
        <div className="navbar-login-mobile">
          <Link to="/login" onClick={toggleMenu}>
            <button>Login/Signup</button>
          </Link>
        </div>
      </div>
      <div className="navbar-login-desktop">
        <Link to="/login">
          <button>Login/Signup</button>
        </Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
