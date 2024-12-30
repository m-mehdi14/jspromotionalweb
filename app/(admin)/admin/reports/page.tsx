import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";

import {
  fetchBrandsCount,
  fetchCategoriesCount,
  fetchUsersCount,
  fetchStoresCount,
  fetchSpecialEventsCount,
  fetchFlyersCount,
} from "@/actions/admin/count-values";
import { AdminReports } from "./_components/reports";

const AdminReportsPage = async () => {
  // Fetch data on the server side
  const [brands, categories, users, stores, specialEvents, flyers] =
    await Promise.all([
      fetchBrandsCount(),
      fetchCategoriesCount(),
      fetchUsersCount(),
      fetchStoresCount(),
      fetchSpecialEventsCount(),
      fetchFlyersCount(),
    ]);

  const metrics = [
    { label: "Brands", value: brands },
    { label: "Categories", value: categories },
    { label: "Users", value: users },
    { label: "Stores", value: stores },
    // { label: "Favourite Stores", value: favourites },
    { label: "Special Events", value: specialEvents },
    { label: "Flyers", value: flyers },
  ];

  return (
    <RoleBasedRoute allowedRoles={["admin"]}>
      <div>
        <AdminReports metrics={metrics} />
      </div>
    </RoleBasedRoute>
  );
};

export default AdminReportsPage;
