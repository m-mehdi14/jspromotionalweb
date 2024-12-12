"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const AdminAuthComponent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-900 via-purple-800 to-blue-600 text-white">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to the Admin Portal
        </h1>
        <p className="text-lg font-medium mb-8">
          Manage brands, stores, flyers, and more effortlessly.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Button
          onClick={() => router.push("/admin-auth/sign-up")}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition-all hover:bg-opacity-70"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/admin-auth/login")}
          className="px-6 py-3 bg-white text-pink-600 rounded-lg shadow-lg font-semibold hover:bg-gray-100 transition-all hover:bg-opacity-70"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminAuthComponent;
