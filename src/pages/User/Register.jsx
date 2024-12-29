import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../../styles/register.scss";

import authService from "../../API/authService";
import { toast } from "react-toastify";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [licenseClass, setLicenseClass] = useState("");
  const [expire, setExpire] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      roles: "customer", // Assuming role is always 'customer'
      licenseId,
      class: licenseClass,
      expire,
      image,
    };

    try {
      const response = await authService.register(userData);
      toast.success("Register successful!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });

      if (response) {
        // Navigate to VerifyOTP page with userID, userType, and OTP (dummy for now)
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Register error!", {
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
        <h2>Register</h2>
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
          </div>
          <div className="form-column">
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
              <label>License ID:</label>
              <input
                type="text"
                placeholder="License ID"
                value={licenseId}
                onChange={(e) => setLicenseId(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Class:</label>
              <input
                type="text"
                placeholder="Class"
                value={licenseClass}
                onChange={(e) => setLicenseClass(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Expire Date:</label>
              <input
                type="date"
                value={expire}
                onChange={(e) => setExpire(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="link-container">
            <Link to={"/register-individual"} className="link">
              Register Individual
            </Link>
            <Link to={"/register-business"} className="link">
              Register Business
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
