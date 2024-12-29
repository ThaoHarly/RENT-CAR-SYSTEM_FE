import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register.scss";
import authService from "../../API/authService";
import { toast } from "react-toastify";

const RegisterIndividual = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Individual-specific fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setPhoneNumber(value);
    } else {
      alert("Phone number must contain only digits.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    const userData = {
      phoneNumber,
      password,
      email,
      name,
      nationality,
      roles: "Service",
      serviceType: "Individual",
      bankName,
      bankAccount,
    };

    try {
      const response = await authService.register(userData);
      toast.success("Register individual successful!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
      if (response) {
        navigate("/verify-otp");
      }
      
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Register individual error!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="close-btn" onClick={() => window.history.back()}>
          ×
        </div>
        <h2>Register as Individual</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-column">
            <div className="input-group">
              <label>Full Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Phone Number:</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-column">
            <div className="input-group">
              <label>Nationality:</label>
              <input
                type="text"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Bank Name:</label>
              <input
                type="text"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Bank Account:</label>
              <input
                type="text"
                placeholder="Bank Account"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterIndividual;
