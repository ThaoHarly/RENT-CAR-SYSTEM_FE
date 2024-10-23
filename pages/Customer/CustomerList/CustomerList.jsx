import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomerList = ({ customers, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-bold mb-4">Customer List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-left">Giấy phép đăng ký</th>
            <th className="px-4 py-2 border text-left">Tên user</th>
            <th className="px-4 py-2 border text-left">Class</th>
            <th className="px-4 py-2 border text-left">Expire</th>
            <th className="px-4 py-2 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <tr key={customer.license}>
                <td className="px-4 py-2 border">{customer.license}</td>
                <td className="px-4 py-2 border">{customer.username}</td>
                <td className="px-4 py-2 border">{customer.class}</td>
                <td className="px-4 py-2 border">{customer.expire}</td>
                <td className="px-4 py-2 border flex space-x-4">
                  <button
                    onClick={() => onEdit(customer)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(customer.license)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No customers available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
