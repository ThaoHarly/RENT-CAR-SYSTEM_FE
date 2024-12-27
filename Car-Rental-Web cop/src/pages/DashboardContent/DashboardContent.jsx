import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { FaHome, FaUserAlt, FaTools, FaCalendarAlt } from 'react-icons/fa';
import DashboardCard from '../DashboardCard/DashboardCard';

const COLORS = ['#FF7F50', '#1C3A57', '#FFB347', '#1C3A57']; // Màu cam và xanh đen

const data = [
  { name: 'Occupied', value: 85 },
  { name: 'Vacant', value: 15 },
];

const DashboardContent = () => {

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Units"
          value="120"
          icon={<FaHome className="h-6 w-6 text-[#1C3A57]" />} // Xanh đen
        />
        <DashboardCard
          title="Occupancy Rate"
          value="85%"
          icon={<FaUserAlt className="h-6 w-6 text-[#FF7F50]" />} // Cam
        />
        <DashboardCard
          title="Maintenance Requests"
          value="8"
          icon={<FaTools className="h-6 w-6 text-[#FFB347]" />} // Màu cam nhạt
        />
        <DashboardCard
          title="Upcoming Events"
          value="3"
          icon={<FaCalendarAlt className="h-6 w-6 text-[#1C3A57]" />} // Xanh đen
        />
      </div>

      {/* Biểu đồ tròn */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mt-10">
        <div className="p-6 bg-white shadow rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Occupancy Status</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
