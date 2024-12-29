import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import authService from "../../API/authService";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      // setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      toast.warning("Mật khẩu mới và xác nhận mật khẩu không khớp!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
      return;
    }

    try {
      setErrorMessage("");
      setSuccessMessage("");

      // Gọi API đổi mật khẩu với query string
      await authService.changePassword({
        curPass: currentPassword,
        newPass: newPassword,
      });

      // setSuccessMessage("Đổi mật khẩu thành công!");
      toast.success("Change password successful!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const message =
        error.response?.data?.message || "Đã xảy ra lỗi khi đổi mật khẩu.";
      toast.error("Change password error!", {
        position: "top-right", // Dùng chuỗi thay vì `toast.POSITION.TOP_RIGHT`
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
        <p className="text-gray-500 mb-6">
          Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu.
        </p>

        {errorMessage && (
          <div className="text-red-600 mb-4 text-sm font-semibold">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 mb-4 text-sm font-semibold">
            {successMessage}
          </div>
        )}

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
                required
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
                required
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
                required
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
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Xác nhận
          </button>
        </form>
      </div>
    </div>
  );
}
