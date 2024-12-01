class AuthStore {
  constructor() {
    this.token = localStorage.getItem("token") || null;
    this.user = null;
  }

  setAuthData(token, user) {
    this.token = token;
    this.user = user;
    localStorage.setItem("token", token);
  }

  clearAuthData() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
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
