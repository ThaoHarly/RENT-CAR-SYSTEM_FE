import React, { useState, useEffect } from 'react';

// Fake API response with car data (currently empty)
const fakeCarsApi = [];

export default function CarListPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Simulate fetching cars from a fake API
    setTimeout(() => {
      setCars(fakeCarsApi); // Currently no cars available
      setBalance(0); // Set balance to 0 for now
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full">
        {/* Title and Balance Display */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Danh sách xe</h2>
          <div className="text-lg font-semibold">
            Số dư: <span className="text-black">{balance} đ</span>
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-4">
          <label htmlFor="statusFilter" className="block text-gray-700 mb-2">Trạng thái:</label>
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

        {/* Empty State or Car List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {/* Render cars here if they exist */}
              {cars.map((car) => (
                <div key={car.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <h4 className="font-semibold">{car.model}</h4>
                  <p>{car.status}</p>
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
              <p className="text-gray-500">Không tìm thấy xe nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
