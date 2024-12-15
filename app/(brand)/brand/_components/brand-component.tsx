"use client";
import React from "react";
import { useAuth } from "@/lib/AuthContext/authContext";
import Link from "next/link";

export const BrandDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 shadow-lg">
        <h1 className="text-4xl font-bold text-white">
          Welcome, {user?.name || "Brand"}!
        </h1>
        <p className="text-gray-100 mt-2">
          Manage your stores, view analytics, and keep everything organized.
        </p>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Total Stores</h2>
          <p className="text-5xl font-extrabold text-white mt-2">12</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Revenue</h2>
          <p className="text-5xl font-extrabold text-green-500 mt-2">$25,000</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-400">Active Stores</h2>
          <p className="text-5xl font-extrabold text-blue-500 mt-2">8</p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/brand/stores">
          <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-4 rounded-lg shadow-lg w-full text-white font-bold text-lg">
            Manage Stores
          </button>
        </Link>
        <Link href="/brand/analytics">
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 px-6 py-4 rounded-lg shadow-lg w-full text-white font-bold text-lg">
            View Analytics
          </button>
        </Link>
      </section>
    </div>
  );
};
