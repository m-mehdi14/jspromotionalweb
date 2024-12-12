"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UnAuthorized = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/"); // Redirect to the homepage or another page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold mb-4 text-red-500">403</h1>
        <h2 className="text-3xl font-semibold mb-4">Access Denied</h2>
        <p className="text-gray-300 mb-8">
          You do not have the required permissions to access this page. If you
          think this is a mistake, please contact your administrator.
        </p>
        <Button
          onClick={handleGoBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default UnAuthorized;
