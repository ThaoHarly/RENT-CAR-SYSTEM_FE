import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import CustomerList from './CustomerList/CustomerList';
import CustomerForm from './CustomerForm/CustomerForm';

const Customer = () => {
  const [customers, setCustomers] = useState([
    { license: '123456', username: 'Nguyen Van A', class: 'A', expire: '2024-12-31' },
    { license: '654321', username: 'Tran Thi B', class: 'B', expire: '2023-10-10' },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addOrUpdateCustomer = (customer) => {
    if (selectedCustomer) {
      // Update existing customer
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) =>
          c.license === customer.license ? customer : c
        )
      );
      toast.success('Customer updated successfully!');
    } else {
      // Add new customer
      setCustomers((prevCustomers) => [...prevCustomers, customer]);
      toast.success('Customer added successfully!');
    }
    setIsFormVisible(false);
    setSelectedCustomer(null);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsFormVisible(true);
  };

  const handleDelete = (license) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.license !== license)
    );
    toast.info('Customer deleted successfully.');
  };

  const handleAddNew = () => {
    setSelectedCustomer(null);
    setIsFormVisible(true);
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Customer
        </button>
      </div>
      {isFormVisible && (
        <CustomerForm
          addOrUpdateCustomer={addOrUpdateCustomer}
          selectedCustomer={selectedCustomer}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
      <CustomerList customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Customer;
