
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Use your environment variable here
});

// Optionally, you can set up interceptors, defaults, etc.
// For example, to add a token to headers if needed
api.interceptors.request.use(config => {
  const storedUserData = localStorage.getItem('userData');
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  if (userData && userData.token) {
    config.headers.Authorization = `Bearer ${userData.token}`;
  }
  
  return config;
});

export default api;
