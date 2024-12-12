"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export const HomeComponent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Our Platform
      </h1>
      <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl">
        Explore our platform to manage your administration, brands, and stores
        efficiently. Choose your role below to get started.
      </p>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {/* Admin Section */}
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Admin</h2>
          <p className="text-gray-400 mb-6">
            Administrators can manage all brands and stores, handle users, and
            generate reports for better insights.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 w-full"
            onClick={() => router.push("/admin-auth")}
          >
            Go to Admin Portal
          </Button>
        </div>

        {/* Brand Section */}
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Brand</h2>
          <p className="text-gray-400 mb-6">
            Brands can manage their stores, create flyers, and issue discount
            cards to boost sales and visibility.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 w-full"
            onClick={() => router.push("/brand-auth")}
          >
            Go to Brand Portal
          </Button>
        </div>

        {/* Store Section */}
        <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Store</h2>
          <p className="text-gray-400 mb-6">
            Store owners can manage flyers and discount cards to attract
            customers and drive sales.
          </p>
          <Button
            className="bg-yellow-600 hover:bg-yellow-700 w-full"
            onClick={() => router.push("/store-auth")}
          >
            Go to Store Portal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
