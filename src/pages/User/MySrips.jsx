import React, { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";

// Fake API response for trips
const fakeTripsApi = {
  currentTrips: [],
  tripHistory: [
    {
      id: 1,
      car: "Ford Mustang",
      date: "12/10/2023",
      location: "Los Angeles, CA",
    },
    {
      id: 2,
      car: "Toyota Camry",
      date: "01/11/2023",
      location: "New York, NY",
    },
  ],
};

// Main component
export default function MyTrips() {
  const [activeTab, setActiveTab] = useState("current");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching trips data from an API
    setTimeout(() => {
      setTrips(fakeTripsApi);
      setLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div>Loading...</div>;

  const activeTrips =
    activeTab === "current" ? trips.currentTrips : trips.tripHistory;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chuyến của tôi</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange("current")}
            className={`${
              activeTab === "current"
                ? "border-b-2 border-green-500 text-black"
                : "text-gray-500"
            } font-semibold text-lg pb-2`}
          >
            Chuyến hiện tại
          </button>
          <button
            onClick={() => handleTabChange("history")}
            className={`${
              activeTab === "history"
                ? "border-b-2 border-green-500 text-black"
                : "text-gray-500"
            } font-semibold text-lg pb-2`}
          >
            Lịch sử chuyến
          </button>

          <button className="ml-auto flex items-center border rounded-md px-4 py-2 text-gray-600">
            <FiFilter className="mr-2" />
            Bộ lọc
          </button>
        </div>

        {/* Conditional Rendering: Either show trips or show empty state */}
        {activeTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {activeTrips.map((trip) => (
              <div key={trip.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{trip.car}</h3>
                <p className="text-gray-500">Date: {trip.date}</p>
                <p className="text-gray-500">Location: {trip.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img
              src="https://via.placeholder.com/400x300?text=No+Current+Trips"
              alt="No Current Trips"
              className="mx-auto"
            />
            <p className="text-gray-500 mt-4">Bạn chưa có chuyến</p>
          </div>
        )}
      </div>
    </div>
  );
}
