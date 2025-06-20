import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/vipra-logo.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#hero"><img src={logo} alt="VipraCo Logo" className="navbar-logo-img" /></a>
      </div>
      <div className="navbar-links">
        <a href="#hero">Home</a>
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        {/* DESIGNER: Add the link to the vObot page here */}
        <a href="#vobot">vObot</a>
      </div>
      <div className="navbar-login">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
