import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import authService from "../../API/authService";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   setErrorMessage(
    //     "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
    //   );
    //   return;
    // }

    try {
      setLoading(true);
      const data = await authService.login({
        Email: email,
        Password: password,
      });
      console.log("Login successful:", data);
      navigate("/home");
      toast.success("Login successful!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
      
    } catch (error) {
      console.error("Login error details:", error.response || error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="close-btn" onClick={() => window.history.back()}>
          ×
        </div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="eye-icon"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide password" : "Show password"}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </div>
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="sign-up">
          Don't have an account? <a href="/register">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
