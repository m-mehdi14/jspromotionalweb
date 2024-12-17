import React from "react";

const RecentOrders = ({ storeId }: { storeId: string }) => {
  console.log("🚀 ~ RecentOrders ~ storeId:", storeId);
  const mockOrders = [
    { id: 1, customer: "Ali", amount: "$150", status: "Completed" },
    { id: 2, customer: "Sara", amount: "$200", status: "Pending" },
    { id: 3, customer: "John", amount: "$50", status: "Cancelled" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <div className="overflow-auto">
        <table className="w-full bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="text-left">
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
