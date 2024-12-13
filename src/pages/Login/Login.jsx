import React, { useState } from "react";
import authService from "../../API/authService";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simple validation
    if (email === "" || password === "") {
      setErrorMessage("Email and password are required.");
      return;
    }

    try {
      // Gửi request đến API qua authServices
      const data = await authService.login({ email, password });

      // Nếu đăng nhập thành công
      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      setErrorMessage("");
      onLoginSuccess(); // Gọi hàm thành công (từ parent component)
    } catch (error) {
      // Xử lý lỗi từ API
      console.log('error', error)
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="w-full max-w-xl bg-white p-10 rounded-lg shadow-lg transform transition-all duration-500 ease-out hover:scale-105"
        style={{
          opacity: 0,
          animation: "floatIn 0.6s ease-out forwards",
        }}
      >
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Login to Dashboard
        </h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 active:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
