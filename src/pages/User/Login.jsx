import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import authService from "../../API/authService";


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

    // Simple validation
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const data = await authService.login({
        Email: email,
        Password: password,
      });
      

      
      console.log("Login successful:", data); // Log response
      navigate("/home");
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



          <div className="mb-3 d-flex align-items-center"> {/* Main container with flexbox */}
            <label htmlFor="email" className="me-2" style={{ minWidth: "80px" }}>Email:</label> {/* Label with margin-right and minimum width */}
            <div className="input-group"> {/* Nested input-group for styling */}
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control" // Bootstrap form control styling
              />
            </div>
          </div>

          <div className="mb-3 d-flex align-items-center"> {/* Main container with flexbox */}
            <label htmlFor="password" className="me-2" style={{ minWidth: "80px" }}>Password:</label> {/* Label with margin-right and minimum width */}
            <div className="password-wrapper d-flex align-items-center w-100"> {/* Flexbox for password input and icon, full width */}
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control" // Bootstrap form control styling
              />
              <button
                className="mx-2"
                onClick={togglePasswordVisibility}
                title={showPassword ? "Hide password" : "Show password"}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
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
