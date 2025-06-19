import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ fontSize: '3rem', color: '#333' }}>Welcome to VipraCo</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>Your Intelligent HR Assistant</p>
      <Link to="/login">
        <button style={{ padding: '1rem 2rem', fontSize: '1.2rem', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
