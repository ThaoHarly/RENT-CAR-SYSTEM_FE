import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
        <p className="text-gray-500 mb-6">
          Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu
        </p>

        <form onSubmit={handleSubmit}>
          {/* Current Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Mật khẩu hiện tại
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Nhập mật khẩu hiện tại"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={toggleCurrentPasswordVisibility}
              >
                {showCurrentPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </div>
            </div>
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Nhập mật khẩu mới"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </div>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Xác nhận mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                placeholder="Xác nhận mật khẩu mới"
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={24} />
                ) : (
                  <AiOutlineEye size={24} />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-300 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
}
