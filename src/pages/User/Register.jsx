import React, { useContext, useState } from "react";
import "../../styles/register.css";
import authService from "../../API/authService";

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
      await authService.register(userData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="close-btn" onClick={() => window.history.back()}>×</div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setPhoneNumber(e.target.value)}
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
          <div className="input-group">
            <label>Image File Name:</label>
            <input
              type="text"
              placeholder="Image File Name"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
