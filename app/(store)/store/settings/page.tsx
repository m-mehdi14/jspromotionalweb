import React from "react";
import StoreSettings from "./_components/store-setting";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const StoreSettingsPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["store"]}>
        <StoreSettings />
      </RoleBasedRoute>
    </div>
  );
};

export default StoreSettingsPage;
