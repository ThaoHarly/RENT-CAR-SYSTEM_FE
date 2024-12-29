import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import axiosClient from "../../API/axiosClient";

const fetchVehicles = async () => {
  try {
    const response = await axiosClient.get(
      `/Vehicle/GetAllVehicle?pageNumber=1&pageSize=20`
    );
    const vehiclesData = response;

    if (vehiclesData && vehiclesData.data) {
      return vehiclesData.data.map((item) => ({
        VehicleID: item.vehicle.vehicleId,
        PricePerDay: item.vehicle.pricePerDay,
        Category: item.vehicle.category,
        status: item.vehicle.status,
        image: item.vehicle.image,
        details: {
          CarImage: item.car?.carImage,
          MotorImage: item.moto?.motorImage,
          CarBrand: item.car?.carBrand || "Motorbike",
        },
      }));
    } else {
      console.error("Invalid API response:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};

export default function MyCar() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  console.log("cars", cars);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const vehicles = await fetchVehicles();
        setCars(vehicles);
        setFilteredCars(vehicles);
        setLoading(false);
      } catch (error) {
        console.error("Error loading vehicles:", error);
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);

    if (status === "Tất cả") {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter((car) => car.status === status));
    }
  };

  const handleDelete = async (vehicleId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa xe này?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await axiosClient.delete(`/Vehicle/DeleteVehicle/${vehicleId}`);
        Swal.fire("Đã xóa!", "Xe đã được xóa thành công.", "success");

        // Cập nhật danh sách xe sau khi xóa
        setCars((prevCars) =>
          prevCars.filter((car) => car.VehicleID !== vehicleId)
        );
        setFilteredCars((prevFilteredCars) =>
          prevFilteredCars.filter((car) => car.VehicleID !== vehicleId)
        );
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        Swal.fire("Lỗi!", "Không thể xóa xe. Vui lòng thử lại!", "error");
      }
    }
  };

  if (loading)
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Danh sách xe của bạn</h2>
        </div>
        <div className="mb-4">
          <label htmlFor="statusFilter" className="block text-gray-700 mb-2">
            Lọc theo trạng thái:
          </label>
          <select
            id="statusFilter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-lg p-2 w-40"
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Đang thuê">Đang thuê</option>
            <option value="Hết hạn">Hết hạn</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCars.map((car) => (
                <div
                  key={car.VehicleID}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm flex items-start"
                >
                  <img
                    src={car.image || "https://via.placeholder.com/150"}
                    alt="Car"
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">
                      {car.details.CarBrand} ({car.Category})
                    </h4>
                    <p className="text-gray-600">
                      Giá thuê: {car.PricePerDay.toLocaleString()} đ/ngày
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        car.status === "Đang thuê"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                    >
                      Trạng thái: {car.status}
                    </p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(car.VehicleID)}
                  >
                    Xóa
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <img
                src="https://via.placeholder.com/400x300?text=No+Cars+Found"
                alt="No Cars Found"
                className="mx-auto mb-4"
              />
              <p className="text-gray-500">Không tìm thấy xe nào phù hợp.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
