import React, { useEffect, useState } from "react";
import axios from "axios";

const fakeCarsApi = [
  {
    id: 1,
    name: "Ford Mustang",
    image: "https://images.unsplash.com/photo-1564435147636-8ca0966b0275?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Xe tự lái",
  },
  {
    id: 2,
    name: "Porsche 911",
    image: "https://i.pinimg.com/enabled_hi/564x/6b/e1/b2/6be1b2c5429af17b90f50b43c539872a.jpg",
    type: "Xe tự lái",
  },
  {
    id: 3,
    name: "Lamborghini Urus",
    image: "https://i.pinimg.com/enabled_hi/564x/e2/c3/8d/e2c38d3427b35ba5552e6e20128e52a4.jpg",
    type: "Xe có tài xế",
  },
];

// Main component
export default function CarFavorite() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Xe tự lái");

  useEffect(() => {
    // Simulate fetching cars from a fake API
    setTimeout(() => {
      setCars(fakeCarsApi);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter cars based on active tab
  const filteredCars = cars.filter((car) => car.type === activeTab);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Xe yêu thích của tôi</h2>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("Xe tự lái")}
            className={`${
              activeTab === "Xe tự lái"
                ? "border-b-2 border-green-500 text-black"
                : "text-gray-500"
            } font-semibold text-lg pb-2`}
          >
            Xe tự lái
          </button>
          <button
            onClick={() => setActiveTab("Xe có tài xế")}
            className={`${
              activeTab === "Xe có tài xế"
                ? "border-b-2 border-green-500 text-black"
                : "text-gray-500"
            } font-semibold text-lg pb-2`}
          >
            Xe có tài xế
          </button>
        </div>

        {/* Show cars or empty state */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-4">{car.name}</h3>
                <p className="text-gray-500">{car.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <img
              src="https://via.placeholder.com/400x300?text=No+Favorite+Cars"
              alt="No Favorite Cars"
              className="mx-auto"
            />
            <p className="text-gray-500 mt-4">Không có xe yêu thích</p>
          </div>
        )}
      </div>
    </div>
  );
}
