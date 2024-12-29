import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { BrandPageComponent } from "./_components/brandPageComponent";

const BrandPage = async () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="min-h-screen bg-white text-white p-8">
          <BrandPageComponent />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
