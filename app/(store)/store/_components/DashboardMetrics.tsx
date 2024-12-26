import React from "react";

interface Metrics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

interface DashboardMetricsProps {
  metrics: Metrics;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ metrics }) => {
  console.log("🚀 ~ metrics:", metrics);
  return (
    // <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //   <div className="p-4 bg-gray-800 rounded-lg shadow">
    //     <h2 className="text-lg font-semibold">Total Orders</h2>
    //     <p className="text-3xl font-bold">{metrics.totalOrders}</p>
    //   </div>
    //   <div className="p-4 bg-gray-800 rounded-lg shadow">
    //     <h2 className="text-lg font-semibold">Total Revenue</h2>
    //     <p className="text-3xl font-bold">${metrics.totalRevenue}</p>
    //   </div>
    //   <div className="p-4 bg-gray-800 rounded-lg shadow">
    //     <h2 className="text-lg font-semibold">Total Customers</h2>
    //     <p className="text-3xl font-bold">{metrics.totalCustomers}</p>
    //   </div>
    // </div>
    <div></div>
  );
};

export default DashboardMetrics;
