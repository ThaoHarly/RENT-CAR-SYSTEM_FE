class AuthStore {
  constructor() {
    this.token = localStorage.getItem("token") || null;
    this.user = JSON.parse(localStorage.getItem("user")) || null;
    this.role = localStorage.getItem("role") || null; // Lấy role từ localStorage
  }

  setAuthData(token, user, role) {
    this.token = token;
    this.user = user;
    this.role = role;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", role); // Lưu role vào localStorage
  }

  clearAuthData() {
    this.token = null;
    this.user = null;
    this.role = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role"); // Xóa role khỏi localStorage
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  getRole() {
    return this.role;
  }
}


const authStore = new AuthStore();
export default authStore;
