import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineUser, AiOutlineHeart, AiOutlineCar } from "react-icons/ai";
import { BsBagCheck, BsGift, BsBoxArrowInRight } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

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

export default function Sidebar() {
  return (
    <div className="bg-white w-70 p-4 flex flex-col h-full shadow-md">
      <div className="text-xl font-bold text-gray-900 mb-6">Xin chào bạn!</div>
      <div className="py-4 flex flex-1 flex-col gap-1">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col pt-4 border-t border-neutral-200">
        <div
          className={classNames(
            "flex items-center gap-2 font-medium px-3 py-2 cursor-pointer text-red-500"
          )}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}

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
