import React from "react";
import { FaHome, FaTools, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaChartBar, FaUserAlt, FaSearch } from "react-icons/fa";

const FinancialManagementContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-semibold text-gray-900">
      Financial Management
    </h1>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Financial Overview
        </h2>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Total Revenue (YTD)
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              $245,000
            </dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Outstanding Payments
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              $12,500
            </dd>
          </div>
          <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Maintenance Expenses (YTD)
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              $78,000
            </dd>
          </div>
        </dl>
      </div>
    </div>
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Recent Transactions
        </h2>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((transaction) => (
            <li
              key={transaction}
              className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">
                  Transaction #{transaction}001
                </div>
                <div className="ml-2 text-sm text-gray-500">
                  May {20 + transaction}, 2023
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {transaction === 1
                      ? "Rent Payment - Unit 101"
                      : transaction === 2
                      ? "Maintenance Fee - Plumbing Repair"
                      : "Utility Payment - Electricity"}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  <p
                    className={
                      transaction === 2 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {transaction === 1
                      ? "+$1,200"
                      : transaction === 2
                      ? "-$350"
                      : "+$180"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
export default FinancialManagementContent;