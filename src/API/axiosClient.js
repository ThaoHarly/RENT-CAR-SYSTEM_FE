
import axios from 'axios';
import authStore from './authStore';

const axiosClient = axios.create({
  baseURL: "http://localhost:7236/api", // Chuyển từ https://localhost sang http://localhost
  headers: {
    "Content-Type": "application/json",
  },
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = authStore.getToken();
    console.log("Token being sent in headers:", token); // Log để kiểm tra token
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
