// AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null); // Thêm profile state
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
      setProfile(savedUser); // Giả sử savedUser có đầy đủ profile
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "http://localhost:3000/users?email=" + email + "&password=" + password
      );
      const data = await response.json();

      if (data.length > 0) {
        setUser(data[0]);
        setToken(data[0].accessToken);
        setProfile(data[0]);

        localStorage.setItem("user", JSON.stringify(data[0]));
        localStorage.setItem("token", data[0].accessToken);

        navigate("/");
      } else {
        alert("Login failed: Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, profile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
