import api from './api';

export const authService = {
  register: async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  googleLogin: async (token) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('collabspace_token');
    localStorage.removeItem('collabspace_user');
  }
};