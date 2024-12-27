import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ContextData = () => {
  // Dữ liệu cho biểu đồ tròn
  const data = [
    { name: "Units Occupied", value: 400 },
    { name: "Units Available", value: 300 },
    { name: "Units Under Maintenance", value: 100 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>

      {/* Biểu đồ tròn */}
      <div className="chart-container">
        <h3 className="text-lg font-semibold mb-2">Occupancy Status</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default ContextData;
