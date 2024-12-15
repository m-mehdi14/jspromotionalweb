import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { BrandDashboard } from "./_components/brand-component";

const BrandPage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
          <BrandDashboard />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
