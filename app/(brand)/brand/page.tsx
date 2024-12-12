import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { BrandComponents } from "./_components/brand-component";

const BrandPage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="">
          <BrandComponents />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
