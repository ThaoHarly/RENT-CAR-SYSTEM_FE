import React, { useState } from "react";
import {
  FaHome,
  FaTools,
  FaCalendarAlt,
  FaBullhorn,
  FaMoneyBillWave,
  FaChartBar,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaUsers,
  FaCar,
  FaStar,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
import DashboardContent from "./DashboardContent/DashboardContent";
import UnitManagementContent from "./UnitManagementContent/UnitManagementContent";
import ReviewList from "./ReviewList/ReviewList";  
import AnnouncementBoardContent from "./AnnouncementBoardContent/AnnouncementBoardContent";
import FinancialManagementContent from "./FinancialManagementContent/FinancialManagementContent";
import Login from "./Login/Login";
import { useTheme } from "../context/Themecontext";
import Customer from "./Customer/Customer";
import Profile from "./Profile/Profile";
import VehicleList from "./VehicleList/VehicleList";

const ResidentialManagementInterface = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaChartBar /> },
    { id: "units", label: "Units", icon: <FaHome /> },
    { id: "vehicle", label: "Vehicle", icon: <FaCar /> }, // Updated icon for Vehicle
    { id: "reviewlist", label: "Review List", icon: <FaStar /> }, // Updated icon for Review List
    { id: "announcements", label: "Announcements", icon: <FaBullhorn /> },
    { id: "customers", label: "Customers", icon: <FaUsers /> },
    { id: "financial", label: "Financial", icon: <FaMoneyBillWave /> },
  ];

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab("dashboard");
    toast("Login successful!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("login");
    toast.info("You have been logged out.");
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "units":
        return <UnitManagementContent />;
      case "vehicle":
        return <VehicleList />;
      case "reviewlist":
        return <ReviewList />;
      case "announcements":
        return <AnnouncementBoardContent />;
      case "customers":
        return <Customer />;
      case "financial":
        return <FinancialManagementContent />;
      case "profile":
        return <Profile />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 ${isDarkMode ? "dark" : ""}`}>
      {isAuthenticated ? (
        <>
          {/* Sidebar for larger screens */}
          <aside className="hidden md:flex md:flex-shrink-0 md:w-64 bg-white dark:bg-gray-800 shadow-lg">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between h-16 bg-indigo-600 dark:bg-indigo-800 px-4">
                <span className="text-white font-semibold text-lg">
                  Rent Car System
                </span>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="flex items-center text-white hover:bg-indigo-700 px-2 py-1 rounded-md"
                >
                  <FaUsers className="mr-2" /> Profile
                </button>
              </div>

              {/* Navigation */}
              <nav className="mt-5 flex-1 px-2 bg-white dark:bg-gray-800 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`${
                      activeTab === item.id
                        ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-600 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                    } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    <span className="mr-3 h-6 w-6">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Logout button */}
              <div className="px-2 mt-4">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </div>

              {/* Dark Mode Toggle */}
              <div className="px-2 mt-4">
                <button
                  onClick={toggleTheme}
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300 flex items-center justify-center"
                >
                  {isDarkMode ? (
                    <FaSun className="mr-2" />
                  ) : (
                    <FaMoon className="mr-2" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </aside>

          {/* Mobile menu */}
          <div className="md:hidden">
            <div className="bg-indigo-600 px-4 py-2 flex items-center justify-between dark:bg-indigo-800">
              <span className="text-white font-semibold">Rent Car System</span>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none focus:text-gray-300"
              >
                <IoMdArrowDropdown
                  className={`h-6 w-6 transform ${
                    isMobileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {isMobileMenuOpen && (
              <nav className="bg-white shadow-lg dark:bg-gray-800">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`${
                      activeTab === item.id
                        ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-600 dark:text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700"
                    } group flex items-center px-4 py-2 text-base font-medium w-full focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  >
                    <span className="mr-3 h-6 w-6">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center mt-4"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
                <button
                  onClick={toggleTheme}
                  className="w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition duration-300 flex items-center justify-center mt-4"
                >
                  {isDarkMode ? (
                    <FaSun className="mr-2" />
                  ) : (
                    <FaMoon className="mr-2" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
              </nav>
            )}
          </div>
        </>
      ) : (
        // Show Login component if not authenticated
        <main className="flex-1 flex items-center justify-center">
          {renderContent()}
        </main>
      )}

      {/* Main content area */}
      {isAuthenticated && (
        <main className="flex-1 overflow-y-auto p-5 dark:bg-gray-900 dark:text-gray-100">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      )}
    </div>
  );
};

export default ResidentialManagementInterface;
