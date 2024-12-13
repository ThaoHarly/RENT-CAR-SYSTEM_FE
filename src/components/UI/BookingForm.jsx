import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../API/axiosClient";

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
    const response = await axiosClient.get(
      `/Vehicle/GetVehicleById/${vehicleId}`
    );
    return response.vehicle.status === "Availability";
  } catch (error) {
    console.error("Error checking vehicle availability:", error);
    return false;
  }
};

const BookingForm = () => {
  const { slug } = useParams(); // VehicleID từ URL

  const [formData, setFormData] = useState({
    orderType: "Test",
    orderDescription: "Payment for rental",
    paymentType: "DEPOSIT",
    vehicleId: slug,
    startDate: "",
    endDate: "",
    paymentMethod: "Online",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data being sent:", formData); // Log dữ liệu gửi đi

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("Start Date must be earlier than End Date.");
      return;
    }

    const isAvailable = await checkVehicleAvailability(formData.vehicleId);
    if (!isAvailable) {
      alert("This vehicle is not available for the selected dates.");
      return;
    }

    setLoading(true);

    try {
      const paymentUrl = await createPaymentUrl(formData);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error(
        "Error during payment:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data || "Failed to create payment. Please try again."
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
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default BookingForm;
