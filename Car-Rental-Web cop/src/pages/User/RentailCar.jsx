import React, { useState, useEffect } from 'react';

// Fake API for long-term rentals
const fakeLongTermTripsApi = [];

export default function RentailCar() {
  const [longTermTrips, setLongTermTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching trips from a fake API
    setTimeout(() => {
      setLongTermTrips(fakeLongTermTripsApi); // Currently no trips
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chuyến thuê xe dài hạn</h2>

        {/* Conditional Rendering: Either show trips or show empty state */}
        {longTermTrips.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {longTermTrips.map((trip) => (
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
              src="https://via.placeholder.com/400x300?text=No+Long-Term+Trips"
              alt="No Long-Term Trips"
              className="mx-auto"
            />
            <p className="text-gray-500 mt-4">Bạn chưa có chuyến</p>
          </div>
        )}
      </div>
    </div>
  );
}
