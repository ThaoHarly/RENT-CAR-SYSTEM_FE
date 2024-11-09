import React, { useContext, useState } from "react";
import "../../styles/register.css";
import AuthContext from "../../contexts/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext); // Access the register function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!"); // Simple password confirmation check
      return;
    }
    setLoading(true);
    try {
      await register(name, phone, password); // Call register function with user data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    alert("Google registration is not implemented yet.");
  };

  const handleFacebookRegister = () => {
    alert("Facebook registration is not implemented yet.");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="close-btn" onClick={() => window.history.back()}>×</div>
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Họ và tên:</label>
            <input
              type="text"
              placeholder="Họ và tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Số điện thoại:</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu:</label>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Xác nhận mật khẩu:</label>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>

        <div className="sign-in">
          Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
        </div>

        <div className="social-register">
          <button className="facebook-btn" onClick={handleFacebookRegister}>
            <i className="fab fa-facebook"></i> Facebook
          </button>
          <button className="google-btn" onClick={handleGoogleRegister}>
            <i className="fab fa-google"></i> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
