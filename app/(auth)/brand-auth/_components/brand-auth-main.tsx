"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { useRouter } from "next/navigation";

export const BrandAuthMain = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="text-center max-w-lg p-6 space-y-6">
        <h1 className="text-4xl font-bold">Welcome to the Brand Portal</h1>
        <p className="text-gray-300">
          Manage your stores, flyers, and discount cards with ease. Login or
          sign up to get started!
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
            onClick={() => router.push("/brand-auth/login")}
          >
            Login
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
            onClick={() => router.push("/brand-auth/signup")}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};
