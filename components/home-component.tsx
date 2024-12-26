"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";

export const HomeComponent = () => {
  const { user } = useAuth();
  console.log("🚀 ~ HomeComponent ~ user:", user?.role);
  const router = useRouter();

  const renderContent = () => {
    if (user) {
      switch (user.role) {
        case "admin":
          return (
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Admin</h2>
              <p className="text-gray-400 mb-6">
                Administrators can manage all brands and stores, handle users,
                and generate reports for better insights.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => router.push("/admin")}
              >
                Go to Admin Portal
              </Button>
            </div>
          );
        case "brand":
          return (
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Brand</h2>
              <p className="text-gray-400 mb-6">
                Brands can manage their stores, create flyers, and issue
                discount cards to boost sales and visibility.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700 w-full"
                onClick={() => router.push("/brand")}
              >
                Go to Brand Portal
              </Button>
            </div>
          );
        case "store":
          return (
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Store</h2>
              <p className="text-gray-400 mb-6">
                Store owners can manage flyers and discount cards to attract
                customers and drive sales.
              </p>
              <Button
                className="bg-yellow-600 hover:bg-yellow-700 w-full"
                onClick={() => router.push("/store")}
              >
                Go to Store Portal
              </Button>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Our Platform
      </h1>
      <p className="text-lg text-gray-300 mb-12 text-center max-w-3xl">
        Explore our platform to manage your administration, brands, and stores
        efficiently. Choose your role below to get started.
      </p>

      {/* Sections */}
      {user ? (
        <>
          <div className="grid grid-cols-1 gap-8 max-w-6xl">
            {renderContent()}
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            {/* Admin Section */}
            {/* <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Admin</h2>
              <p className="text-gray-400 mb-6">
                Administrators can manage all brands and stores, handle users,
                and generate reports for better insights.
              </p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 w-full"
                onClick={() => router.push("/admin-auth")}
              >
                Go to Admin Portal
              </Button>
            </div> */}

            {/* Brand Section */}
            <div className="bg-gray-800 rounded-lg p-6 text-center shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Brand</h2>
              <p className="text-gray-400 mb-6">
                Brands can manage their stores, create flyers, and issue
                discount cards to boost sales and visibility.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700 w-full"
                onClick={() => router.push("/brand-auth/login")}
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
                onClick={() => router.push("/store-auth/login")}
              >
                Go to Store Portal
              </Button>
            </div>
          </div>
          <button
            className="fixed bottom-28 left-4 bg-blue-600 hover:bg-blue-700 text-white py-5 px-4 rounded-full"
            onClick={() => router.push("/admin-auth")}
          >
            Are you an Admin?
          </button>
        </>
      )}
    </div>
  );
};

export default HomeComponent;
