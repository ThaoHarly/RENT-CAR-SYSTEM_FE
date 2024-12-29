import React, { useState } from "react";
import "../../styles/addCars.css";
import axiosClient from "../../API/axiosClient";
import { toast } from "react-toastify";

export default function AddCar() {
  const [carData, setCarData] = useState({
    category: "",
    licensePlate: "",
    pricePerDay: "",
    fuelConsumption: "",
    range: "",
    engineCapacity: "",
    carBrand: "",
    fuelType: "GASOLINE",
    seatingCapacity: "",
    chargingTime: 0,
    image:
      "https://media.auto5.vn/files/theanh/2021/04/19/toyota_bz4x_concept_01-095102.jpg",
  });

  const [imageFile, setImageFile] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle change for car data inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  // Handle change for image upload
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload Image API
  const uploadImage = async (vehicleId) => {
    if (!imageFile) {
      console.warn("No image file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("VehicleId", vehicleId);
    formData.append("ImagePath", imageFile);

    // Log dữ liệu form để kiểm tra
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await axiosClient.post("/Vehicle/UploadImages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      // Gọi API thêm xe
      const response = await axiosClient.post("/Vehicle/AddVehicle", carData);

      // Kiểm tra response và lấy vehicleId
      const newVehicleId = response.vehicle.vehicleId; // Đảm bảo lấy đúng key từ response
      console.log("newVehicleId", newVehicleId);

      if (!newVehicleId) {
        throw new Error("Vehicle ID is missing in the response.");
      }

      setVehicleId(newVehicleId); // Lưu vehicleId vào state nếu cần

      // Gọi API upload ảnh
      await uploadImage(newVehicleId);

      // Hiển thị thông báo thành công
      setSuccessMessage("Thêm xe thành công!");
      toast.success("Add car successful!", { position: "top-right" });

      // Reset form
      setCarData({
        category: "",
        licensePlate: "",
        pricePerDay: "",
        fuelConsumption: "",
        range: "",
        engineCapacity: "",
        carBrand: "",
        fuelType: "GASOLINE",
        seatingCapacity: "",
        chargingTime: 0,
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding car or uploading image:", error);
      toast.error("Add car error!", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car-container">
      <h2 className="title">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={carData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="licensePlate"
            placeholder="License plate"
            value={carData.licensePlate}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Rental price"
            value={carData.pricePerDay}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="fuelConsumption"
            placeholder="Fuel consumption"
            value={carData.fuelConsumption}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="range"
            placeholder="Range"
            value={carData.range}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="engineCapacity"
            placeholder="Engine Capacity"
            value={carData.engineCapacity}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="carBrand"
            placeholder="Brand"
            value={carData.carBrand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="seatingCapacity"
            placeholder="Seating Capacity"
            value={carData.seatingCapacity}
            onChange={handleChange}
            required
          />
          <select
            name="fuelType"
            value={carData.fuelType}
            onChange={handleChange}
          >
            <option value="GASOLINE">Gasoline</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electric</option>
          </select>
        </div>

        <div className="form-row">
          <label className="file-upload-label">Update Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Đang thêm..." : "Add Vehicle"}
        </button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}
