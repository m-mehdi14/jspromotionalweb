import React from "react";
import AdminBrand from "./_components/admin-brand";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminBrandPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <AdminBrand />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminBrandPage;
