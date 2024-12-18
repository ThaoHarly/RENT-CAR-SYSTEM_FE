import React from 'react';

export default function DeleteAccountPage() {
  const handleDeleteAccount = () => {
    // Logic for account deletion request
  };

  const handleCancel = () => {
    // Logic for canceling the deletion request
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Yêu cầu xóa tài khoản</h2>

        {/* Illustration */}
        <div className="text-center mb-6">
          <img
            src="https://via.placeholder.com/400x300?text=Delete+Account+Illustration"
            alt="Account Deletion Illustration"
            className="mx-auto mb-4"
          />
        </div>

        {/* Description */}
        <div className="text-gray-600 mb-6">
          <p className="mb-4">
            Khi xóa tài khoản, các thông tin sau (nếu có) sẽ bị xóa trên hệ thống:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Thông tin cá nhân</li>
            <li>Thông tin lịch sử chuyến và danh sách xe</li>
          </ul>
          <p className="mb-4">
            Tiền ví và điểm thưởng sẽ được thanh toán theo quy định và chính sách hiện hành của Mioto.
          </p>
          <p className="mb-4">
            Việc đồng ý xóa tài khoản là bạn đã chấp nhận điều khoản chính sách xóa tài khoản của Mioto.
          </p>
          <p className="mb-4">
            Yêu cầu xóa tài khoản sẽ được xử lý trong vòng 15 ngày làm việc. Mioto sẽ liên hệ trực tiếp với bạn
            thông qua Email hoặc Số điện thoại đã cung cấp.
          </p>
          <p>
            Mọi thắc mắc xin liên hệ Fanpage của RentCarSystem hoặc Hotline 0905121335 (7AM - 10PM) để được hỗ trợ.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Xóa tài khoản
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}
