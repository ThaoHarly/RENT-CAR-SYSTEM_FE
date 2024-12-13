import React, { useState } from "react";

const CustomerForm = ({ addOrUpdateCustomer, selectedCustomer, onCancel }) => {
  const [formData, setFormData] = useState(
    selectedCustomer || { license: "", username: "", class: "", expire: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateCustomer(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-md rounded-md w-full max-w-lg mx-auto"
    >
      <h2 className="text-lg font-bold mb-4">
        {selectedCustomer ? "Update Customer" : "Add New Customer"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Giấy phép đăng ký
        </label>
        <input
          type="text"
          name="license"
          value={formData.license}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Tên user
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Class</label>
        <input
          type="text"
          name="class"
          value={formData.class}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Expire
        </label>
        <input
          type="date"
          name="expire"
          value={formData.expire}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {selectedCustomer ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
