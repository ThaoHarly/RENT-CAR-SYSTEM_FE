import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../API/axiosClient";
import { toast } from "react-toastify";

const createPaymentUrl = async (paymentData) => {
  try {
    const response = await axiosClient.post(
      `/Payment/CreatePaymentUrlVnpay`,
      paymentData
    );
    return response; // URL thanh toán từ API
  } catch (error) {
    console.error(
      "Error creating payment URL:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const checkVehicleAvailability = async (vehicleId) => {
  try {
    // Sử dụng query parameter thay vì URL path
    const response = await axiosClient.get(
      `/Vehicle/GetVehicleById`,
      { params: { vehicleId } } // Truyền vehicleId dưới dạng query parameter
    );
    console.log("Full response from API:", response);

    const vehicle = response?.vehicle; // Đảm bảo đọc từ response.data
    if (!vehicle) {
      console.error("Vehicle data not found:", response);
      toast.error("Vehicle not found. Please check the ID.", {
        position: "top-right",
      });
      return false;
    }

    console.log("Vehicle status:", vehicle.status);
    return vehicle.status === "Availability"; // Kiểm tra trạng thái "Availability"
  } catch (error) {
    console.error("Error checking vehicle availability:", error);

    if (error.response?.status === 404) {
      toast.error("Vehicle not found. Please verify the ID.", {
        position: "top-right",
      });
    } else {
      toast.error(
        error.response?.data || "Error checking vehicle availability.",
        { position: "top-right" }
      );
    }
    return false;
  }
};


const BookingForm = () => {
  const { slug } = useParams(); // VehicleID từ URL
  const [formData, setFormData] = useState({
    orderType: "Test",
    orderDescription: "Payment for rental",
    paymentType: "DEPOSIT",
    vehicleId: slug, // VehicleID từ URL
    startDate: "",
    endDate: "",
    paymentMethod: "Online",
  });

  const [loading, setLoading] = useState(false); // Trạng thái khi gửi thanh toán
  const [checkingAvailability, setCheckingAvailability] = useState(false); // Trạng thái khi kiểm tra tính khả dụng

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data being sent:", formData);

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast.warning("Start Date must be earlier than End Date.", {
        position: "top-right",
      });
      return;
    }

    setCheckingAvailability(true); // Bắt đầu kiểm tra
    const isAvailable = await checkVehicleAvailability(formData.vehicleId);
    setCheckingAvailability(false); // Kết thúc kiểm tra

    if (!isAvailable) {
      console.log("Vehicle is not available.");
      return; // Dừng lại nếu xe không khả dụng
    }

    setLoading(true);

    try {
      const paymentUrl = await createPaymentUrl(formData);
      window.location.href = paymentUrl; // Chuyển hướng đến URL thanh toán
    } catch (error) {
      console.error(
        "Error during payment:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data || "Failed to create payment. Please try again.",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="orderDescription">Order Description</label>
        <input
          type="text"
          id="orderDescription"
          name="orderDescription"
          className="form-control"
          value={formData.orderDescription}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="form-control"
          value={formData.startDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="form-control"
          value={formData.endDate}
          onChange={handleInputChange}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading || checkingAvailability}
      >
        {loading
          ? "Processing..."
          : checkingAvailability
          ? "Checking availability..."
          : "Pay Now"}
      </button>
    </form>
  );
};

export default BookingForm;
