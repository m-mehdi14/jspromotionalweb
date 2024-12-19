"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const AdminAuthComponent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Welcome to the Admin Portal
        </h1>
        <p className="text-lg font-medium text-gray-300">
          Manage brands, stores, flyers, and more effortlessly.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-6 justify-center">
        <Button
          onClick={() => router.push("/admin-auth/sign-up")}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-bold shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Sign Up
        </Button>
        <Button
          onClick={() => router.push("/admin-auth/login")}
          className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-bold shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-50"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AdminAuthComponent;