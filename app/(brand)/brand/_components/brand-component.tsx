"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext/authContext";
import { fetchStoresByBrand } from "@/actions/admin/brand/store/fetch-stores";
import Link from "next/link";

export const BrandDashboard = () => {
  const { user, handleLogout } = useAuth();
  const [totalStores, setTotalStores] = useState<number>(0);

  useEffect(() => {
    const fetchTotalStores = async () => {
      if (user?.uid) {
        try {
          const stores = await fetchStoresByBrand(user.uid);
          setTotalStores(stores.length);
        } catch (error) {
          console.error("Failed to fetch total stores:", error);
        }
      }
    };

    fetchTotalStores();
  }, [user?.uid]);

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      {/* Welcome Header */}
      <header className="p-4 border-b border-gray-300">
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.name || "Brand"}!
        </h1>
        <p className="text-gray-600 text-sm">
          Manage your stores effortlessly with our minimalistic dashboard.
        </p>
      </header>

      {/* KPI Section */}
      <section className="mt-6">
        <div className="bg-gray-100 p-4 rounded border border-gray-300">
          <h2 className="text-sm text-gray-500">Total Stores</h2>
          <p className="text-3xl font-bold">{totalStores}</p>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="mt-6 space-y-4">
        <Link href={`/brand/${user?.uid}/stores`}>
          <button
            disabled={!user?.uid}
            className="w-full px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800"
          >
            Manage Stores
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Logout
        </button>
      </section>
    </div>
  );
};
