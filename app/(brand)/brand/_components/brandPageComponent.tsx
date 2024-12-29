// "use client";

// import React, { useEffect, useState } from "react";
// import { useAuth } from "@/lib/AuthContext/authContext";
// import { fetchStoresByBrand } from "@/actions/admin/brand/store/fetch-stores";
// import Link from "next/link";

// export const BrandDashboard = () => {
//   const { user, handleLogout } = useAuth();
//   const [totalStores, setTotalStores] = useState<number>(0);

//   useEffect(() => {
//     const fetchTotalStores = async () => {
//       if (user?.uid) {
//         try {
//           const stores = await fetchStoresByBrand(user.uid);
//           setTotalStores(stores.length);
//         } catch (error) {
//           console.error("Failed to fetch total stores:", error);
//         }
//       }
//     };

//     fetchTotalStores();
//   }, [user?.uid]);

//   return (
//     <div className="bg-white min-h-screen p-6 text-black">
//       {/* Welcome Header */}
//       <header className="p-4 border-b border-gray-300">
//         <h1 className="text-2xl font-semibold">
//           Welcome, {user?.name || "Brand"}!
//         </h1>
//         <p className="text-gray-600 text-sm">
//           Manage your stores effortlessly with our minimalistic dashboard.
//         </p>
//       </header>

//       {/* KPI Section */}
//       <section className="mt-6">
//         <div className="bg-gray-100 p-4 rounded border border-gray-300">
//           <h2 className="text-sm text-gray-500">Total Stores</h2>
//           <p className="text-3xl font-bold">{totalStores}</p>
//         </div>
//       </section>

//       {/* Action Buttons */}
//       <section className="mt-6 space-y-4">
//         <Link href={`/brand/${user?.uid}/stores`}>
//           <button
//             disabled={!user?.uid}
//             className="w-full px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800"
//           >
//             Manage Stores
//           </button>
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="w-full px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded hover:bg-gray-700"
//         >
//           Logout
//         </button>
//       </section>
//     </div>
//   );
// };

///////////////////////////////////////////////////////////////

"use client";

import { useState, useEffect } from "react";
import {
  fetchFlyersCountByBrand,
  fetchSpecialEventsCountByBrand,
  fetchStoresCountByBrand,
} from "@/actions/brand/count-values";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FaHome, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export const BrandPageComponent = () => {
  const { handleLogout, user } = useAuth();
  interface Metric {
    label: string;
    value: number;
    icon: JSX.Element;
  }

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch metrics data
        const [stores, specialEvents, flyers] = await Promise.all([
          fetchStoresCountByBrand(user?.uid as string), // Replace "YOUR_BRAND_ID" dynamically
          fetchSpecialEventsCountByBrand(user?.uid as string),
          fetchFlyersCountByBrand(user?.uid as string),
        ]);

        // Set metrics
        setMetrics([
          {
            label: "Stores",
            value: stores,
            icon: <FaHome className="text-3xl text-gray-600" />,
          },
          {
            label: "Special Events",
            value: specialEvents,
            icon: <FaCalendarAlt className="text-3xl text-gray-600" />,
          },
          {
            label: "Flyers",
            value: flyers,
            icon: <FaCheckCircle className="text-3xl text-gray-600" />,
          },
        ]);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between p-6 bg-gray-100 shadow-md">
        <h1 className="text-2xl font-bold text-black">Brand Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Welcome, {user?.email || "Admin"}!</p>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading metrics...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="mr-4">{metric.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {metric.value}
                  </p>
                  <p className="text-gray-500">{metric.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
