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
      await authService.sendForgotPasswordLink({ email });
      setSuccessMessage("Password reset link has been sent to your email.");
      navigate("/reset-password")
    } catch (error) {
      console.error("Forgot Password error:", error.response || error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
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
