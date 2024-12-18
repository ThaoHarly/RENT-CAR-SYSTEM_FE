import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../API/axiosClient";
import { toast } from "react-toastify";

const Payment = () => {
  const { agreementId } = useParams(); // Lấy AgreementID từ URL
  const [billId, setBillId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin khách hàng từ localStorage
    const user = JSON.parse(localStorage.getItem("user")); // Parse JSON từ localStorage
    if (user) {
      setCustomer(user);
    } else {
      toast.error("User information not found. Please log in again.");
    }

    // Tạo Bill khi component được mount
    const createBill = async () => {
      try {

        const response = await axiosClient.post("/customer/bills", {
          agreementId, // Gửi AgreementID để tạo Bill
        });
        if (response?.newBill?.BillID) {
          setBillId(response.newBill.BillID);
          toast.success("Bill created successfully!");
        } else {
          throw new Error("Invalid API response: Missing BillID");
        }
      } catch (err) {
        console.error("Error creating bill:", err);
        toast.error("Failed to create bill. Please try again.");
      }
    };

    if (agreementId) {
      createBill();
    }
  }, [agreementId]);

  const handlePayment = async () => {
    if (!billId) {
      setError("Bill not created yet. Please try again.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await axiosClient.post("/customer/bills/pay", { BillID: billId }); // Thanh toán
      setSuccess(true);
      toast.success("Payment successful!");
      navigate("/cars");
    } catch (err) {
      console.error("Error during payment:", err);
      setError("Payment failed. Please try again.");
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-semibold text-gray-700">Payment</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Info */}
          {customer && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Customer Information</h2>
              <p>
                <strong>Name:</strong> {customer.Name}
              </p>
              <p>
                <strong>Email:</strong> {customer.Email}
              </p>
              <p>
                <strong>Phone Number:</strong> {customer.PhoneNumber}
              </p>
              <p>
                <strong>Nationality:</strong> {customer.Nationality}
              </p>
            </div>
          )}

          {/* Payment Info */}
          {billId && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold">Payment Details</h2>
              <p>
                <strong>Bill ID:</strong> {billId}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Place Order Button */}
          <button
            className={`w-full py-3 px-4 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Make Payment"}
          </button>

          {/* Success Message */}
          {success && (
            <p className="text-green-500 text-center mt-4">
              Payment successful! Thank you for your order.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
