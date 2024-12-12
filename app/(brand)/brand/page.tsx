import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";

const BrandPage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="">Brand Page</div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
