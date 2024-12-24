"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const StoreAuthComponent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="text-center space-y-6">
        {/* Heading */}
        <h1 className="text-4xl font-bold">Welcome to Store Portal</h1>
        <p className="text-lg text-gray-300">
          Manage your store with ease. Log in or sign up to get started.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push("/store-auth/login")}
          >
            Login
          </Button>
          {/* <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push("/store-auth/sign-up")}
          >
            Sign Up
          </Button> */}
        </div>
      </div>
    </div>
  );
};
