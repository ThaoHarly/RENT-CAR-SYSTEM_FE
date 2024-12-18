import React from 'react';
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCamera } from "react-icons/ai";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { AiOutlineUser, AiOutlineHeart, AiOutlineCar } from "react-icons/ai";
import { BsBagCheck, BsGift, BsBoxArrowInRight } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Logout from '../../function/logout';
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 1,
    label: "Tài khoản của tôi",
    icon: <AiOutlineUser />,
    path: "/user/account",
  },
  {
    key: 2,
    label: "Xe yêu thích",
    icon: <AiOutlineHeart />,
    path: "/user/favorite-cars",
  },
  {
    key: 3,
    label: "Xe của tôi",
    icon: <AiOutlineCar />,
    path: "/user/my-cars",
  },
  {
    key: 4,
    label: "Chuyến của tôi",
    icon: <BsBoxArrowInRight />,
    path: "/user/my-trips",
  },
  {
    key: 5,
    label: "Đơn hàng Thuê xe dài hạn",
    icon: <BsBagCheck />,
    path: "/user/long-term-rental",
  },
  { key: 6, label: "Quà tặng", icon: <BsGift />, path: "/user/gifts" },
  {
    key: 7,
    label: "Địa chỉ của tôi",
    icon: <AiOutlineCar />,
    path: "/user/addresses",
  },
  {
    key: 8,
    label: "Đổi mật khẩu",
    icon: <FiLock />,
    path: "/user/change-password",
  },
  {
    key: 9,
    label: "Yêu cầu xóa tài khoản",
    icon: <RiDeleteBinLine />,
    path: "/user/delete-account",
  },
];
function HomepageVHS() {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  // const user = {
  //     name: "Thảo nè",
  //     email: "nguyenvana@example.com",
  //     phoneNumber: "0901234567"
  //   };
  const profile = {
    website: "aa"
  }
  return (
    <div className="bg-white-100 h-screen overflow-hidden flex justify-center m-5">
      <div className="w-full max-w-screen-xl px-10 flex flex-row">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-4 min-h-0 overflow-auto">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageVHS;


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
        <div className="">
          {/* Conditionally rendering user.name with a fallback */}
          <h1 className="text-xxl font-bold">{user?.name || 'No Name'}</h1>
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
          <span>{user.phoneNumber}</span>
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

const Sidebar  = (
    <div className="bg-white w-70 p-4 flex flex-col h-full shadow-md">
      <div className="text-xl font-bold text-gray-900 mb-6">Xin chào bạn!</div>
      <div className="py-4 flex flex-1 flex-col gap-1">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col pt-4 border-t border-neutral-200">

        <div
          to="#"
          onClick={Logout}
          className={classNames(
            "flex items-center gap-2 font-medium px-3 py-2 cursor-pointer text-red-500"
          )}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span >
          Đăng xuất
        </div>

      </div>
    </div>
  );

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        "flex items-center gap-2 font-medium px-3 py-2 rounded-md",
        pathname === link.path
          ? "bg-gray-100 text-gray-900 border-l-4 border-green-500"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
