
import axios from 'axios';
import authStore from './authStore';

const axiosClient = axios.create({
  baseURL: "https://localhost:7236/api", 
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = authStore.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      authStore.clearAuthData(); 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
