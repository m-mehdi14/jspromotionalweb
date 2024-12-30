import React from "react";
import { AdminCategories } from "./_components/admin-categories";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminCategoriesPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <AdminCategories />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminCategoriesPage;
