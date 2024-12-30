import React from "react";
import StoreFlyers from "./_components/store-flyers";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const StoreFlyersPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["store"]}>
        <StoreFlyers />
      </RoleBasedRoute>
    </div>
  );
};

export default StoreFlyersPage;
