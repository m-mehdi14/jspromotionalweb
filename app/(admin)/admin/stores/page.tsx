import React from "react";
import { Stores } from "./_components/stores";
import { fetchAllStores } from "@/actions/admin/stores/fetch-stores";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminStoresPage = async () => {
  const stores = await fetchAllStores(); // Fetch stores from server

  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <Stores stores={stores} />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminStoresPage;
