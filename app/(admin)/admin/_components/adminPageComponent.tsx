"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { useRouter } from "next/navigation";
import React from "react";

export const AdminPageComponent = () => {
  const { handleLogout, user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between p-6 bg-gray-100 shadow-md">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Logged in as: {user?.email}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manage Brands */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Manage Brands
            </h3>
            <p className="text-gray-500 mb-4">
              Create, update, and manage all registered brands.
            </p>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded"
              onClick={() => router.push("/admin/brand")}
            >
              Manage Brands
            </Button>
          </div>

          {/* Manage Settings */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Admin Settings
            </h3>
            <p className="text-gray-500 mb-4">
              Manage your Admins and their settings.
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded"
              onClick={() => router.push("/admin/settings")}
            >
              Manage Settings
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center p-4 bg-gray-100 text-gray-600">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminPageComponent;
