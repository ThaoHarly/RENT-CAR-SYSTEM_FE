import authStore from "./authStore";
import axiosClient from "./axiosClient";

const authService = {
  login: async (credentials) => {
    const response = await axiosClient.post("/Auth/Login", credentials);
    const { token, user } = response;
    authStore.setAuthData(token, user);
    return response;
  },

  register: async (userData) => {
    const response = await axiosClient.post("/Auth/Register", userData);
    return response;
  },

  logout: () => {
    authStore.clearAuthData();
    window.location.href = "/login";
  },

  sendForgotPasswordLink: async (payload) => {
    const response = await axiosClient.post(
      "/Auth/SendLinkForgotPassword",
      payload
    );
    return response;
  },

  resetForgotPassword: async (payload) => {
    const response = await axiosClient.post(
      "/Auth/ResetForgotPassword",
      payload
    );
    return response;
  },
};

export default authService;
