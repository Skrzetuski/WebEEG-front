import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = baseUrl+"auth";

export const login = async (login, password) => {
  const response = await axios.post(`${API_URL}/login`, { login, password });
  return response.data; 
};
