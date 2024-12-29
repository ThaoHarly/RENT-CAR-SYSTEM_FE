import authStore from "./authStore";
import axiosClient from "./axiosClient";

const authService = {
  login: async (credentials) => {
    const response = await axiosClient.post("/Auth/Login", credentials);
    const { token, user, roleDTO } = response;
    const role = roleDTO?.role; // Lấy role từ response
    authStore.setAuthData(token, user, role); // Lưu thêm role
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
    const response = await axiosClient.put(
      "/Auth/ResetForgotPassword",
      payload
    );
    return response;
  },

  verifyOTP: async (payload) => {
    const response = await axiosClient.post("/Auth/VerifyOTP", payload);
    return response;
  },

  changePassword: async ({ curPass, newPass }) => {
    try {
      const response = await axiosClient.put(
        `/Auth/ChangePassword?curPass=${encodeURIComponent(
          curPass
        )}&newPass=${encodeURIComponent(newPass)}`
      );
      return response;
    } catch (error) {
      throw error.response ? error.response : new Error("Unexpected error");
    }
  },
};

export default authService;
