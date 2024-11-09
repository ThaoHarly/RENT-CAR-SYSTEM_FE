import React, { useContext, useState } from "react";
import "../../styles/login.css";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await login(phone, password); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login is not implemented yet.");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login is not implemented yet.");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="close-btn" onClick={() => window.history.back()}>×</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="eye-icon">👁️</div> {}
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forget Password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="sign-up">
          Bạn chưa là thành viên? <a href="/register">Register</a>
        </div>

        <div className="social-login">
          <button className="facebook-btn" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook"></i> Facebook
          </button>
          <button className="google-btn" onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
