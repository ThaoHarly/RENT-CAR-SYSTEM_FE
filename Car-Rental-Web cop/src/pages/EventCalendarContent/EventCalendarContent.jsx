import React from "react";
import { FaHome, FaTools, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaChartBar, FaUserAlt, FaSearch } from "react-icons/fa";

const EventCalendarContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-semibold text-gray-900">Event Calendar</h1>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {/* Calendar component would go here */}
        <div className="text-center py-10 text-gray-500">
          Interactive calendar component to be implemented
        </div>
      </div>
    </div>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Upcoming Events
        </h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {[1, 2, 3].map((event) => (
          <li
            key={event}
            className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-indigo-600">
                Community Meeting #{event}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                June {event + 14}, 2023
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Discussion on upcoming renovations and community improvements
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default EventCalendarContent;
