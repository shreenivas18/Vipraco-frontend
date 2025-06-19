import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Dashboard.css'; // Import new styles

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
                        text: `Hi ${currentUser.firstName || currentUser.id}! I'm VipraCo, your intelligent HR assistant. How can I help you today?`,
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

        const newMessages = [...messages, { sender: 'user', text: query }];
        setMessages(newMessages);
        setQuery('');
        setIsTyping(true);

        // **TODO**: Replace with actual API call once endpoint is known
        setTimeout(() => {
            setMessages([
                ...newMessages,
                {
                    sender: 'bot',
                    text: 'This is a placeholder response. The real answer will come from the backend.',
                },
            ]);
            setIsTyping(false);
        }, 1500);
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
