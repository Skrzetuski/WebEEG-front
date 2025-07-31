import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL+"auth",
});

export const login = async (login, password) => {
  const response = await API.post('/login', { login, password });
  return response.data; 
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};