import React from "react";
import { FaHome, FaTools, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaChartBar, FaUserAlt, FaSearch } from "react-icons/fa";

const AnnouncementBoardContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-semibold text-gray-900">Announcement Board</h1>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Recent Announcements
        </h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Post Announcement
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((announcement) => (
            <li
              key={announcement}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-indigo-600">
                  Important Notice #{announcement}
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  Posted: May {15 + announcement}, 2023
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {announcement === 1
                  ? "Scheduled maintenance for the elevator on June 1st"
                  : announcement === 2
                  ? "New recycling program starting next month"
                  : "Annual residents' meeting on June 15th"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
export default AnnouncementBoardContent;