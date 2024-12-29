import React, { useEffect, useState } from "react";
import "../../styles/BillPage.css";
import axiosClient from "../../API/axiosClient";

const BillPage = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bills from API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/Payment/GetBills");
        setBills(response);
      } catch (err) {
        setError("Failed to load bills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return <div className="loading">Loading bills...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="bill-page">
      <h1>Bill Management</h1>
      {bills.length === 0 ? (
        <div className="no-bills">No bills found.</div>
      ) : (
        <table className="bill-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Agreement ID</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.billId}>
                <td>{bill.billId}</td>
                <td>{bill.agreementId || "N/A"}</td>
                <td>{bill.paymentMethod}</td>
                <td>{bill.date}</td>
                <td>{bill.orderDescription}</td>
                <td
                  className={`status ${
                    bill.status.toLowerCase() === "completed"
                      ? "completed"
                      : "pending"
                  }`}
                >
                  {bill.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BillPage;
