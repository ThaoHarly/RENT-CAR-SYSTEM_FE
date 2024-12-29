import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/register/registerBusiness.css";
import authService from "../../API/authService";
import { toast } from "react-toastify";

const RegisterBusiness = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [description, setDescription] = useState("");
  const [businessImg, setBusinessImg] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [vat, setVat] = useState("");
  const [issuingLocation, setIssuingLocation] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");

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
      roles: "service",
      serviceType: "Business",
      bankName,
      bankAccount,
      description,
      businessImg,
      registrationDate,
      vat,
      issuingLocation,
      dateOfIssue,
    };

    try {
      const response = await authService.register(userData);
      toast.success("Register Business successful!", {
        position: "top-right",
      });

      if (response) {
        navigate("/verify-otp");
      }
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Register Business error!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-box">
        <div className="close-btn" onClick={() => window.history.back()}></div>
        <h2>Register as Business</h2>
        <form onSubmit={handleSubmit} className="reg-form">
          <div className="form-row">
            <div className="form-col">
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

            <div className="form-col">
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
              <div className="input-group">
                <label>Description:</label>
                <textarea
                  placeholder="Information about the business ..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="input-group">
                <label>Business Image:</label>
                <input
                  type="text"
                  placeholder="Image File Name"
                  value={businessImg}
                  onChange={(e) => setBusinessImg(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-col">
              <div className="input-group">
                <label>Registration Date:</label>
                <input
                  type="date"
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>VAT:</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="VAT Percentage"
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Issuing Location:</label>
                <input
                  type="text"
                  placeholder="Issuing Location"
                  value={issuingLocation}
                  onChange={(e) => setIssuingLocation(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Date of Issue:</label>
                <input
                  type="date"
                  value={dateOfIssue}
                  onChange={(e) => setDateOfIssue(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="reg-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusiness;
