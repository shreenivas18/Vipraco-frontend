import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tluy8f133b.execute-api.us-east-1.amazonaws.com/Prod',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Voice API Instance ---
// IMPORTANT: Replace with your actual voice service URL
const VOICE_API_URL = 'https://your-voice-api-endpoint.com/api';

const voiceApi = axios.create({
  baseURL: VOICE_API_URL,
});

// Attach JWT token to every voice request as well
voiceApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { api, voiceApi };

// Default export for backward compatibility
export default api;
