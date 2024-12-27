import React from "react";
import { Users } from "./_components/users";
import { FetchUsers } from "@/actions/admin/users/fetch-users";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminUsersPage = async () => {
  const users = await FetchUsers(); // Fetch users using server action
  return (
    <>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Users</h1>
          <Users users={users} /> {/* Pass users data to table component */}
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default AdminUsersPage;
