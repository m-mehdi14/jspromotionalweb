import React from "react";
import AdminSettings from "./_components/admin-settings";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminSettingPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <AdminSettings />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminSettingPage;
