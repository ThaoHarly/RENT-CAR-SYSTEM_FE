import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../API/authService";
import "../../styles/verify.css";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [userType, setUserType] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { userID, otp, userType };
      const response = await authService.verifyOTP(payload);

      if (response) {
        toast.success("Verify OTP successful!", {
          position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
        });

        navigate("/home");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      alert("OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-box">
        <h2>Verify OTP</h2>
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label>User ID:</label>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>User Type:</label>
            <input
              type="text"
              placeholder="Enter User Type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Enter OTP:</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
