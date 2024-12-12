import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";

const StorePage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["store"]}>
        <div className="">Store Page</div>
      </RoleBasedRoute>
    </>
  );
};

export default StorePage;
