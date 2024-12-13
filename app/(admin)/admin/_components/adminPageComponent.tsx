"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { useRouter } from "next/navigation";
import React from "react";

export const AdminPageComponent = () => {
  const { handleLogout, user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between p-6 bg-gray-900 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-300">Logged in as: {user?.email}</p>
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-bold mb-8">Welcome, Admin!</h2>
        <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl">
          Use the options below to manage your platform effectively.
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Manage Brands */}
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manage Brands</h3>
            <p className="text-gray-400 mb-6">
              Create, update, and manage all registered brands.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => router.push("/admin/brand")}
            >
              Manage Brands
            </Button>
          </div>

          {/* Manage Stores */}
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4">Manage Stores</h3>
            <p className="text-gray-400 mb-6">
              Oversee all stores under registered brands.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 w-full"
              onClick={() => alert("Navigate to Manage Stores Page")}
            >
              Manage Stores
            </Button>
          </div>

          {/* Generate Reports */}
          <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <h3 className="text-xl font-semibold mb-4">Generate Reports</h3>
            <p className="text-gray-400 mb-6">
              Generate comprehensive reports for analytics.
            </p>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 w-full"
              onClick={() => alert("Navigate to Generate Reports Page")}
            >
              Generate Reports
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center p-4 bg-gray-900 text-gray-400">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminPageComponent;
