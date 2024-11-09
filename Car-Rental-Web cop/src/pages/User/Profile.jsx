import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";
import { HiOutlinePlusCircle } from "react-icons/hi";
import AuthContext from "../../contexts/AuthContext";

// Main Profile Page Component
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Accessing user from AuthContext

  useEffect(() => {
    // Fetch data from fake API
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Pass user into ProfileInfoCard */}
        <ProfileInfoCard profile={profile} user={user} />

        {/* Driver's License Form */}
        <DrivingLicenseForm />

        {/* Referral Program Section */}
        <ReferralProgram />

        {/* User's Card Section */}
        <UserCard />
      </div>
    </div>
  );
}


// Profile Information Component
function ProfileInfoCard({ profile, user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Thông tin tài khoản</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <FiEdit2 />
        </button>
      </div>
      <div className="flex items-center mt-4">
        <div className="w-20 h-20 rounded-full bg-gray-300 overflow-hidden">
          {/* Profile Image */}
          <img
            src={user.avatar}
            alt="profile"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="ml-4">
          {/* Conditionally rendering user.name with a fallback */}
          <h3 className="text-xl font-semibold">{user?.name || 'No Name'}</h3>
          <p className="text-sm text-gray-500">Tham gia: 10/03/2020</p>
        </div>
        <div className="ml-auto flex items-center">
          <div className="text-center">
            <span className="block text-lg font-semibold">0</span>
            <span className="text-sm text-gray-500">Chuyến</span>
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Email</span>
          <span>{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span>Phone</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex justify-between">
          <span>Website</span>
          <span>{profile.website}</span>
        </div>
      </div>
    </div>
  );
}


// Driving License Form Component
function DrivingLicenseForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Giấy phép lái xe</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <FiEdit2 />
        </button>
      </div>
      <p className="text-sm text-red-500 mt-4">
        Lưu ý: Giấy phép lái xe của bạn sắp hết hạn. Vui lòng cập nhật hình ảnh
        GPLX.
      </p>
      <div className="mt-6">
        <label className="block mb-2">Hình ảnh</label>
        <div className="border border-gray-300 rounded-lg p-4 text-center">
          <AiOutlineCamera size={24} className="text-gray-400 mx-auto mb-2" />
          <span className="text-gray-400">Tải lên hình ảnh GPLX</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Số GPLX</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Nhập số GPLX"
          />
        </div>
        <div>
          <label className="block mb-2">Họ và tên</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg"
            placeholder="Nhập họ và tên"
          />
        </div>
        <div>
          <label className="block mb-2">Ngày sinh</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Referral Program Section
function ReferralProgram() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-bold">Giới thiệu bạn mới</h2>
      <div className="mt-4">
        <img
          src="https://via.placeholder.com/300x150"
          alt="Referral Program"
          className="w-full rounded-lg"
        />
        <p className="mt-4 text-sm">
          Chương trình giới thiệu Mioto đến bạn bè và nhận quà hấp dẫn.
        </p>
      </div>
    </div>
  );
}

// User Card Section
function UserCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Thẻ của tôi</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <HiOutlinePlusCircle />
        </button>
      </div>
      <div className="flex justify-center items-center mt-4">
        <img
          src="https://via.placeholder.com/150"
          alt="No Card"
          className="w-40 h-40"
        />
      </div>
      <p className="text-center text-gray-400 mt-4">Bạn chưa có thẻ nào</p>
    </div>
  );
}
