import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Save token and user info in localStorage (so that it persists on refresh)
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
  }, []);

  const login = async (phone, password) => {
    try {
      const response = await fetch(
        "http://localhost:5000/users?phone=" + phone + "&password=" + password
      );
      const data = await response.json();

      if (data.length > 0) {
        // Save token and user details
        setUser(data[0]);
        setToken(data[0].accessToken);

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(data[0]));
        localStorage.setItem("token", data[0].accessToken);

        navigate("/");
      } else {
        alert("Login failed: Invalid phone number or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const register = async (userData) => {
    // Mock registration - typically, you would post userData to an API
    console.log("User registered:", userData);
    alert("Registration successful!");
    navigate("/login");
  };

  const logout = () => {
    // Clear user and token data
    setUser(null);
    setToken(null);

    // Remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
