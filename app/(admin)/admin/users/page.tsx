import React from "react";
import { Users } from "./_components/users";
import { FetchUsers } from "@/actions/admin/users/fetch-users";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminUsersPage = async () => {
  const initialUsers = await FetchUsers(); // Fetch users using server action

  return (
    <RoleBasedRoute allowedRoles={["admin"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 bg-black p-7 text-white rounded-md">Admin Users</h1>
        <Users initialUsers={initialUsers} /> {/* Pass initial users data */}
      </div>
    </RoleBasedRoute>
  );
};

export default AdminUsersPage;
