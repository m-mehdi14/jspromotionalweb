import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { BrandDashboard } from "./_components/brand-component";

const BrandPage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="min-h-screen bg-white text-white p-8">
          <BrandDashboard />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
