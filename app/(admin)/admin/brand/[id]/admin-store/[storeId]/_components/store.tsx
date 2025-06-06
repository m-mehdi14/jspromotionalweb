"use client";

import { fetchStoreDetails } from "@/actions/admin/brand/specific-store/fetch-store";
import React, { useEffect, useState } from "react";
import { StoreDetails } from "./StoreDetails";

interface AdminStoreProps {
  brandId: string;
  storeId: string;
}

const AdminStore = ({ brandId, storeId }: AdminStoreProps) => {
  const [storeDetails, setStoreDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (brandId && storeId) {
        try {
          const data = await fetchStoreDetails(brandId, storeId);
          // @ts-expect-error ignore
          setStoreDetails(data?.data);
        } catch (error) {
          console.error("Error fetching store details:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchDetails();
  }, [brandId, storeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading store details...</p>
        </div>
      </div>
    );
  }

  if (!storeDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500 font-semibold">Store not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <StoreDetails store={storeDetails} brandId={brandId} />
    </div>
  );
};

export default AdminStore;
