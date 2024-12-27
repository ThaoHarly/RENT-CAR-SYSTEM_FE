import React from "react";

const DashboardCard = ({ title, value, icon}) => (
  <div
    className="p-6 bg-white shadow rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-indigo-50 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-xl font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  </div>
);

export default DashboardCard;
