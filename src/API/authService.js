import authStore from './authStore';
import axiosClient from './axiosClient';

const authService = {
  login: async (credentials) => {
    const response = await axiosClient.post('/auth/login', credentials);
    const { token } = response; 
    authStore.setAuthData(token); 
    return response;  
  },

  register: async (userData) => {
    const response = await axiosClient.post('/auth/register', userData);
    return response;
  },

  logout: () => {
    authStore.clearAuthData(); 
    window.location.href = '/login';
  },
};

export default authService;
