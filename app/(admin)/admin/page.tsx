import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { AdminPageComponent } from "./_components/adminPageComponent";

const AdminPage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <div>
          <AdminPageComponent />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default AdminPage;
