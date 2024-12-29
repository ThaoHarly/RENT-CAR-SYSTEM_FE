import React, { useState } from "react";
import authService from "../../API/authService";
import "../../styles/forgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (email.trim() === "") {
      setErrorMessage("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.sendForgotPasswordLink({
        email: email.trim(),
      });
      setSuccessMessage(response); // Hiển thị thông báo thành công
      navigate('/reset-password')
    } catch (error) {
      console.error("Forgot Password error:", error.response || error);

      // Xử lý lỗi từ backend
      if (error.response?.status === 400) {
        setErrorMessage("Invalid email. Please try again.");
      } else if (error.response?.status === 409) {
        setErrorMessage("A reset request already exists for this email.");
      } else if (error.response?.status === 500) {
        setErrorMessage("Server error: Unable to process your request.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Please enter your email to reset your password</p>

        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

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

          <button
            type="submit"
            className="forgot-password-btn"
            disabled={loading}
          >
            {loading ? "Sending link..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
