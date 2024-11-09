import React, { useState, useEffect } from "react";

// Simulated API response for saved addresses (empty for now)
const fakeAddressesApi = [];

export default function MyAddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching addresses from a fake API
    setTimeout(() => {
      setAddresses(fakeAddressesApi); // Currently no saved addresses
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Địa chỉ của tôi</h2>
          <button className="border rounded-md px-4 py-2 text-gray-600 hover:text-black">
            Thêm địa chỉ mới
          </button>
        </div>

        {/* List of saved addresses or empty state */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Địa chỉ đã lưu</h3>

          {addresses.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <h4 className="font-semibold">{address.name}</h4>
                  <p>
                    {address.street}, {address.city}, {address.country}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <img
                src="https://via.placeholder.com/400x300?text=No+Saved+Addresses"
                alt="No Saved Addresses"
                className="mx-auto mb-4"
              />
              <p className="text-gray-500">Bạn chưa có địa chỉ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
