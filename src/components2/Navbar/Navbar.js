import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/vipra-logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ showLoginButton = true, isLandingPage = true }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    if (isOpen) {
      toggleMenu();
    }
  };

  const handleVipraCoClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    if (isOpen) {
      toggleMenu();
    }
  };

  const handleNavClick = (e, section) => {
    e.preventDefault();
    if (!isLandingPage) {
      navigate('/', { state: { scrollTo: section } });
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (isOpen) {
      toggleMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#" onClick={(e) => handleNavClick(e, 'hero')}><img src={logo} alt="VipraCo Logo" className="navbar-logo-img" /></a>
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="#" onClick={(e) => handleNavClick(e, 'hero')}>Home</a>
        <a href="#" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
        <a href="#" onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</a>
        <a href="#" onClick={handleVipraCoClick}>VipraCo</a>
        {showLoginButton &&
          (localStorage.getItem('token') ? (
            <div className="navbar-login-mobile">
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="navbar-login-mobile">
              <Link to="/login" onClick={toggleMenu}>
                <button>Login/Signup</button>
              </Link>
            </div>
          ))}
        
      </div>
      {showLoginButton &&
        (localStorage.getItem('token') ? (
          <div className="navbar-login-desktop">
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navbar-login-desktop">
            <Link to="/login">
              <button>Login/Signup</button>
            </Link>
          </div>
        ))}
      <div className="navbar-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
};

export default Navbar;
