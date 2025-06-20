import React, { useEffect, useState, useRef } from 'react';
import SpotlightCard from './SpotlightCard';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Dashboard.css'; // Import new styles
import Waves from './Waves'; // Import the new Waves component
import VoiceChat from './VoiceChat'; // Import the new VoiceChat component
import Navbar from '../components2/Navbar/Navbar';
import botImage from '../assets/robot.png'; // Import the new bot image

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null); // Add a ref for the input field
    const [chatMode, setChatMode] = useState('selection'); // 'selection', 'text', 'voice'

    // Scroll to the bottom of the chat on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus the input field when entering text chat or after bot replies
    useEffect(() => {
        if (chatMode === 'text' && !isTyping && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatMode, isTyping]);

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

        const userMessage = { sender: 'user', text: query, data: null };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentQuery = query;
        setQuery('');
        setIsTyping(true);

        try {
            const endpoint = user.role === 'Admin' ? '/admin/ai-query' : '/user/ai-query';
            const requestBody = { prompt: currentQuery };
            const result = await api.post(endpoint, requestBody);

            let botResponseText = 'Sorry, I could not find an answer.';
            let botResponseData = null;

            if (result.data) {
                botResponseText = result.data.message || botResponseText;
                if (Array.isArray(result.data.data) && result.data.data.length > 0) {
                    botResponseData = result.data.data;
                }
            }
            
            setMessages([
                ...newMessages,
                { sender: 'bot', text: botResponseText, data: botResponseData },
            ]);

        } catch (err) {
            console.error('API Error:', err);
            const errorMessage = err.response?.data?.message || 'An error occurred while fetching the response.';
            setMessages([
                ...newMessages,
                { sender: 'bot', text: errorMessage, data: null },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderData = (data) => {
        if (!Array.isArray(data) || data.length === 0) {
            return null;
        }

        const firstItem = data[0];
        if (typeof firstItem !== 'object' || firstItem === null) {
            return (
                <ul className="data-list">
                    {data.map((item, index) => (
                        <li key={index}>{String(item)}</li>
                    ))}
                </ul>
            );
        }

        const headers = Object.keys(firstItem);
        return (
            <div className="data-table-container">
                <table className="data-table">
                    <thead>
                        <tr>
                            {headers.map(header => (
                                <th key={header}>{header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {headers.map(header => (
                                    <td key={header}>{String(row[header])}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderContent = () => {
        switch (chatMode) {
            case 'text':
                return (
                    <>
                        <main className="chat-container">
                            <Waves
                                lineColor="rgba(0,0,0,0.05)"
                                backgroundColor="rgba(255, 255, 255, 0.2)"
                            />
                            <div className="message-list">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`message ${msg.sender}`}>
                                        <div className="message-avatar">{msg.sender === 'bot' ? '🤖' : '👤'}</div>
                                        <div className="message-content">
                                            <div className="message-text">{msg.text}</div>
                                            {msg.sender === 'bot' && msg.data && renderData(msg.data)}
                                        </div>
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
                                    ref={inputRef}
                                    type="text"
                                    className="query-input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Ask a question about your leave, payroll, benefits..."
                                    disabled={isTyping}
                                />
                                <button type="submit" className="send-button" disabled={isTyping || !query.trim()}>
                                    ✨Generate
                                </button>
                            </form>
                        </footer>
                    </>
                );
            case 'voice':
                return <VoiceChat />;
            case 'selection':
            default:
                return (
                    <main className="mode-selection-container">
                        <div className="selection-image-container">
                            <img src={botImage} alt="AI Assistant" className="selection-bot-img" />
                        </div>
                        <div className="selection-cards-container">
                            <SpotlightCard className="chat-mode-card" onClick={() => setChatMode('text')}>
                                <span className="material-symbols-outlined">chat</span>
                                <h2>Text Chat</h2>
                                <p>Type your questions and get answers from the HR assistant.</p>
                            </SpotlightCard>
                            <SpotlightCard className="chat-mode-card" onClick={() => setChatMode('voice')}>
                                <span className="material-symbols-outlined">mic</span>
                                <h2>Voice Chat</h2>
                                <p>Speak your questions and hear the responses from the HR assistant.</p>
                            </SpotlightCard>
                        </div>
                    </main>
                );
        }
    };

    return (
        <>
            <Navbar showLoginButton={false} isLandingPage={false} />
            <div className="page-container page-with-navbar">
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <div>
                        {chatMode !== 'selection' && (
                            <button onClick={() => setChatMode('selection')} className="back-button">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                        )}
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
                {renderContent()}
            </div>
        </div>
        </>
    );
};

export default Dashboard;
