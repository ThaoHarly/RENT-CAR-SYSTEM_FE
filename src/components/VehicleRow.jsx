import React from "react";

const VehicleRow = ({ vehicle, car, moto }) => {
  const isCar = vehicle.category === "CAR";

  return (
    <li className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-indigo-600 truncate">
          {isCar ? `Car - ${car?.carBrand}` : `Motorbike - ${moto?.motorId}`}
        </div>
        <div className="ml-2 flex-shrink-0 flex">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              vehicle.status === "AVAILABILITY"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {vehicle.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
        {/* Vehicle Image */}
        <div className="flex-shrink-0">
          <img
            // src={isCar ? car?.carImage : moto?.motorImage}
            src="https://stimg.cardekho.com/images/carexteriorimages/630x420/Toyota/Fortuner/10903/1695443447797/front-left-side-47.jpg?impolicy=resize&imwidth=480"
            alt={isCar ? `Car Image - ${car?.carBrand}` : `Motorbike Image`}
            className="w-24 h-16 object-cover rounded-md shadow"
          />
        </div>

        {/* Vehicle Details */}
        <div className="flex-1 sm:ml-6 mt-4 sm:mt-0">
          <p className="text-sm text-gray-600">
            <strong>License Plate:</strong> {vehicle.licensePlate}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Category:</strong> {vehicle.category}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Price Per Day:</strong> ${vehicle.pricePerDay}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Fuel Consumption:</strong> {vehicle.fuelConsumption} L/100km
          </p>
          <p className="text-sm text-gray-600">
            <strong>Range:</strong> {vehicle.range} km
          </p>
          <p className="text-sm text-gray-600">
            <strong>Engine Capacity:</strong> {vehicle.engineCapacity}L
          </p>
          {isCar && (
            <>
              <p className="text-sm text-gray-600">
                <strong>Brand:</strong> {car?.carBrand}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Fuel Type:</strong> {car?.fuelType}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Seating Capacity:</strong> {car?.seatingCapacity}
              </p>
            </>
          )}
          {!isCar && (
            <>
              <p className="text-sm text-gray-600">
                <strong>Motor ID:</strong> {moto?.motorId}
              </p>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default VehicleRow;
