import React from "react";
import StoreSpecialEvents from "./_components/store-special-events";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const StoreSpecialEventPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["store"]}>
        <StoreSpecialEvents />
      </RoleBasedRoute>
    </div>
  );
};

export default StoreSpecialEventPage;
