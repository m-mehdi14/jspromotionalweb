import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";

import {
  fetchBrandsCount,
  fetchCategoriesCount,
  fetchStoresCount,
  fetchSpecialEventsCount,
  fetchFlyersCount,
  fetchBrandsData,
  fetchCategoriesData,
  fetchStoresData,
  fetchSpecialEventsData,
  fetchFlyersData,
} from "@/actions/admin/count-values";
import { AdminReports } from "./_components/reports";
import { FetchUsers, fetchUsersCount } from "../users/_components/action";
interface AdminReportsPageProps {
  searchParams: {
    startDate?: string;
    endDate?: string;
  };
}

const AdminReportsPage = async ({ searchParams }: AdminReportsPageProps) => {
  const { startDate, endDate } = searchParams;
  console.log("🚀 ~ AdminReportsPage ~ endDate:", endDate);
  console.log("🚀 ~ AdminReportsPage ~ startDate:", startDate);
  // Fetch data on the server side
  const [
    brands,
    categories,
    users,
    stores,
    specialEvents,
    flyers,
    brandData,
    categoriesData,
    usersData,
    storesData,
    specialEventsData,
    flyersData,
  ] = await Promise.all([
    // fetchBrandsCount(),
    // fetchCategoriesCount(),
    // fetchUsersCount(),
    // fetchStoresCount(),
    // fetchSpecialEventsCount(),
    // fetchFlyersCount(),
    fetchBrandsCount(startDate, endDate),
    fetchCategoriesCount(startDate, endDate),
    // fetchUsersCount(startDate, endDate),
    fetchUsersCount(startDate, endDate),
    fetchStoresCount(startDate, endDate),
    fetchSpecialEventsCount(startDate, endDate),
    fetchFlyersCount(startDate, endDate),
    fetchBrandsData(startDate, endDate),
    fetchCategoriesData(startDate, endDate),
    FetchUsers(startDate, endDate),
    fetchStoresData(startDate, endDate),
    fetchSpecialEventsData(startDate, endDate),
    fetchFlyersData(startDate, endDate),
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
        <AdminReports
          metrics={metrics}
          brands={brandData}
          categories={categoriesData}
          users={usersData}
          stores={storesData}
          specialEvents={specialEventsData}
          flyers={flyersData}
        />
      </div>
    </RoleBasedRoute>
  );
};

export default AdminReportsPage;
