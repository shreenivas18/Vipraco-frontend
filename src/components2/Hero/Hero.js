import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Hero.css';
import botImage from '../../assets/bot-img.png';
const Hero = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };
  return (
    <div id="hero" className="hero-container">
      <div className="hero-text">
        <h1>
          Empowering Employees with <br />
          <span>Instant HR Answers</span>
        </h1>
        <p>
          VipraCo is an AI-powered HR assistant that provides immediate, accurate
          responses to employee questions 24/7, reducing HR workload and
          improving employee satisfaction.
        </p>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
      <div className="hero-image">
        <img src={botImage} alt="VipraCo AI Bot" className="hero-bot-img" />
      </div>
    </div>
  );
};

export default Hero;
