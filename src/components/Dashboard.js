import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Dashboard.css'; // Import new styles
import Waves from './Waves'; // Import the new Waves component

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Fetch user info and set initial welcome message
    useEffect(() => {
        const fetchUserAndWelcome = async () => {
            try {
                const response = await api.get('/auth/me');
                const currentUser = response.data.data.user;
                setUser(currentUser);
                setMessages([
                    {
                        sender: 'bot',
                        text: `Hi ${currentUser.role || currentUser.id}! I'm VipraCo, your intelligent HR assistant. How can I help you today?`,
                    },
                ]);
            } catch (error) {
                console.error('Failed to fetch user', error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }
        };
        fetchUserAndWelcome();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await api.get('/auth/logout');
        } catch (error) {
            console.error('Logout failed on server, but clearing token locally.', error);
        } finally {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = { sender: 'user', text: query };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentQuery = query;
        setQuery('');
        setIsTyping(true);

        try {
            // Determine the correct endpoint based on the user's role
            const endpoint = user.role === 'Admin' ? '/admin/ai-query' : '/user/ai-query';

            // Prepare the request body
            const requestBody = { prompt: currentQuery };

            // Make the API call
            const result = await api.post(endpoint, requestBody);

            let botResponse = 'Sorry, I could not find an answer.';
            if (result.data && result.data.data && result.data.data.message) {
                botResponse = result.data.data.message;
            } else if (result.data && result.data.message) { // Fallback for simpler response
                botResponse = result.data.message;
            }

            setMessages([
                ...newMessages,
                { sender: 'bot', text: botResponse },
            ]);

        } catch (err) {
            console.error('API Error:', err);
            const errorMessage = err.response?.data?.data?.message || err.response?.data?.message || 'An error occurred while fetching the response.';
            setMessages([
                ...newMessages,
                { sender: 'bot', text: errorMessage },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="page-container">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div>
                        <h1>VipraCo HR Assistant</h1>
                        {user && (
                            <div className="user-info">
                                <span>Role: {user.role}</span>
                                <span>Org: {user.organizationId}</span>
                            </div>
                        )}
                    </div>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </header>
                <main className="chat-container">
                    <Waves
                        lineColor="rgba(0,0,0,0.05)" // A very subtle black for the lines
                        backgroundColor="rgba(255, 255, 255, 0.2)"
                        waveSpeedX={0.02}
                        waveSpeedY={0.01}
                        waveAmpX={40}
                        waveAmpY={20}
                        friction={0.9}
                        tension={0.01}
                        maxCursorMove={120}
                        xGap={12}
                        yGap={36}
                    />
                    <div className="message-list">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-avatar">{msg.sender === 'bot' ? '🤖' : '👤'}</div>
                                <div className="message-content">{msg.text}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>
                <footer className="query-form">
                    <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%' }}>
                        <input
                            type="text"
                            className="query-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask a question about your leave, payroll, benefits..."
                            disabled={isTyping}
                        />
                        <button type="submit" className="send-button" disabled={isTyping || !query.trim()}>
                            Send
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;
