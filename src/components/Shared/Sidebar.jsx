import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineUser, AiOutlineCar } from "react-icons/ai";
import { BsFileEarmarkText, BsFillPlusSquareFill } from "react-icons/bs";
import { FiLock } from "react-icons/fi";

const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: 1,
    label: "My account",
    icon: <AiOutlineUser />, // User profile icon
    path: "/user/account",
  },
  {
    key: 2,
    label: "Add car",
    icon: <BsFillPlusSquareFill />, // Add car icon
    path: "/user/add-car",
  },
  {
    key: 3,
    label: "My car",
    icon: <AiOutlineCar />, // Car icon for user's car list
    path: "/user/my-car",
  },
  {
    key: 4,
    label: "Bill",
    icon: <BsFileEarmarkText />, // Bill/invoice icon
    path: "/user/bill",
  },
  {
    key: 5,
    label: "Change password",
    icon: <FiLock />, // Lock icon for password change
    path: "/user/change-password",
  },
];

export default function Sidebar() {
  return (
    <div className="bg-white w-70 p-4 flex flex-col h-full shadow-md">
      <div className="text-xl font-bold text-gray-900 mb-6">Welcome !</div>
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
          <HiOutlineLogout className="text-xl" />
          Logout
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
