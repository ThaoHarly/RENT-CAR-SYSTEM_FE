class AuthStore {
  constructor() {
    this.token = localStorage.getItem("token") || null;
    this.user = JSON.parse(localStorage.getItem("user")) || null;
  }

  setAuthData(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Lưu user vào localStorage
  }

  clearAuthData() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Xóa user khỏi localStorage
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }
}

const authStore = new AuthStore();
export default authStore;
