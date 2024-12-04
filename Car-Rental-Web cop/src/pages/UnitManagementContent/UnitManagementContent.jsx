import React, { useState } from "react";
import { FaHome, FaTools, FaCalendarAlt, FaBullhorn, FaMoneyBillWave, FaChartBar, FaUserAlt, FaSearch } from "react-icons/fa";

const UnitManagementContent = () => {
  // Mock data for units
  const units = [
    { unit: "101", tenant: "John Doe", rent: 1200, status: "Occupied" },
    { unit: "201", tenant: "Jane Doe", rent: 1300, status: "Occupied" },
    { unit: "301", tenant: "Sam Smith", rent: 1100, status: "Occupied" },
    { unit: "101", tenant: "John Doe", rent: 1200, status: "Occupied" },
    { unit: "201", tenant: "Jane Doe", rent: 1300, status: "Occupied" },
    { unit: "301", tenant: "Sam Smith", rent: 1100, status: "Occupied" },
    { unit: "101", tenant: "John Doe", rent: 1200, status: "Occupied" },
    { unit: "201", tenant: "Jane Doe", rent: 1300, status: "Occupied" },
    { unit: "301", tenant: "Sam Smith", rent: 1100, status: "Occupied" },
    { unit: "101", tenant: "John Doe", rent: 1200, status: "Occupied" },
    { unit: "201", tenant: "Jane Doe", rent: 1300, status: "Occupied" },
    { unit: "301", tenant: "Sam Smith", rent: 1100, status: "Occupied" },
    // Add more unit data here
  ];

  const [sortField, setSortField] = useState("unit");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const unitsPerPage = 5;

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting logic
  const sortedUnits = [...units].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    if (sortDirection === "asc") {
      return fieldA > fieldB ? 1 : -1;
    } else {
      return fieldA < fieldB ? 1 : -1;
    }
  });

  // Pagination logic
  const indexOfLastUnit = currentPage * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = sortedUnits.slice(indexOfFirstUnit, indexOfLastUnit);
  const totalPages = Math.ceil(units.length / unitsPerPage);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">
        Rent Unit Managemet
      </h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Unit List
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search units..."
              className="border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => handleSort("unit")}
              >
                Unit{" "}
                {sortField === "unit" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
              <button
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => handleSort("tenant")}
              >
                Tenant{" "}
                {sortField === "tenant" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </button>
              <button
                className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                onClick={() => handleSort("rent")}
              >
                Rent{" "}
                {sortField === "rent" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {currentUnits.map((unit, index) => (
              <li
                key={index}
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-indigo-600 truncate">
                    Unit {unit.unit}
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {unit.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <FaUserAlt className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {unit.tenant}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <FaMoneyBillWave className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    <p>Rent: ${unit.rent}/month</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination Controls */}
        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstUnit + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUnit, units.length)}
                </span>{" "}
                of <span className="font-medium">{units.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitManagementContent;