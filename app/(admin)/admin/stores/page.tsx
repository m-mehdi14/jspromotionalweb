import React from "react";
import { Stores } from "./_components/stores";
import { fetchAllStores } from "@/actions/admin/stores/fetch-stores";

const AdminStoresPage = async () => {
  const stores = await fetchAllStores(); // Fetch stores from server

  return (
    <div>
      <Stores stores={stores} />
    </div>
  );
};

export default AdminStoresPage;
