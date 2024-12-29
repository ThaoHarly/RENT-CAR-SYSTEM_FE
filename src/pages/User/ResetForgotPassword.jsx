import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../API/authService";
import "../../styles/resetPassword.css";
import { toast } from "react-toastify";

const ResetForgotPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!token || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        token,
        newPassword,
      };

      // Gọi API reset password
      await authService.resetForgotPassword(payload);

      // setSuccessMessage("Password reset successful! Redirecting to login...");
      toast.success("Password reset successful! Redirecting to login...", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Reset Password error:", error.response || error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        "An error occurred. Please try again.";
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          <div className="input-group">
            <label>Token:</label>
            <input
              type="text"
              placeholder="Enter your token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>New Password:</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="reset-password-btn"
            disabled={loading}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetForgotPassword;
