import React, { useState, useEffect } from "react";
import VehicleRow from "../../components/VehicleRow";
import { fetchVehicles } from "../../services/vehicleService";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVehicles(1, 10); // Fetch page 1 with 10 items
        setVehicles(data.data || []); // Safeguard in case `data` is undefined
      } catch (err) {
        setError("Failed to load vehicle data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadVehicles();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Vehicles</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Vehicle List
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {vehicles.map(({ vehicle, car, moto }) => (
              <VehicleRow
                key={vehicle.vehicleId}
                vehicle={vehicle}
                car={car}
                moto={moto}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
