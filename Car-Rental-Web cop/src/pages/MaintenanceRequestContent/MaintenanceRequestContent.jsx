import React from "react";
import { FaHome, FaTools, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaChartBar, FaUserAlt, FaSearch } from "react-icons/fa";

const MaintenanceRequestContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-semibold text-gray-900">
      Maintenance Requests
    </h1>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Active Requests
        </h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          New Request
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((request) => (
            <li
              key={request}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-indigo-600 truncate">
                  Request #{request}001
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    In Progress
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    <FaTools className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    Plumbing Issue
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <FaCalendarAlt className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                  <p>Submitted: May 15, 2023</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default MaintenanceRequestContent