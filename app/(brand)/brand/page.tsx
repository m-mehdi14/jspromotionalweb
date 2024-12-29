import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { BrandPageComponent } from "./_components/brandPageComponent";
import {
  fetchBrandsCount,
  fetchCategoriesCount,
  fetchUsersCount,
  fetchStoresCount,
  fetchSpecialEventsCount,
  fetchFlyersCount,
} from "@/actions/brand/count-values";


const BrandPage = async () => {
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
    // { label: "Brands", value: brands },
    // { label: "Categories", value: categories },
    // { label: "Users", value: users },›
    { label: "Stores", value: stores },
    // { label: "Favourite Stores", value: favourites },
    { label: "Special Events", value: specialEvents },
    { label: "Flyers", value: flyers },
  ];

  return (
    <>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <div className="min-h-screen bg-white text-white p-8">
          <BrandPageComponent metrics={metrics} />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default BrandPage;
