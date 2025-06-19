import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Failed to fetch user', error);
        // If token is invalid or expired, redirect to login
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Inform the backend to invalidate the session
      await api.get('/auth/logout');
    } catch (error) {
      console.error('Logout failed on server, but clearing token locally.', error);
    } finally {
      // Always clear the token and redirect
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '3rem', color: '#333' }}>Dashboard</h1>
      {user ? (
        <>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Welcome, {user.firstName || user.email}!
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: '#d9534f',
              color: 'white',
              border: 'none',
              borderRadius: '5px'
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Could not load user data. Please try logging in again.</p>
      )}
    </div>
  );
};

export default Dashboard;
