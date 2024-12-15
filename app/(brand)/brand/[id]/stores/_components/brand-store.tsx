"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { fetchStoresByBrand } from "@/actions/admin/brand/store/fetch-stores";
import { saveStore } from "@/actions/admin/brand/store/save-store";
import Header from "./Header";
import StoreList from "./StoreList";
import StoreForm from "./StoreForm";
import { Store } from "./types";

interface BrandStoreProps {
  brandId: string;
}

export const BrandStore: React.FC<BrandStoreProps> = ({ brandId }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch stores and handle loading state
  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStoresByBrand(brandId);
      setStores(data as Store[]);
    } catch (error) {
      toast.error("Failed to fetch stores");
      console.error("Error fetching stores:", error);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  // Handle save store action
  const handleSaveStore = async (
    storeData: Omit<Store, "id" | "brandId"> & { password: string }
  ) => {
    setIsSubmitting(true);
    try {
      const response = await saveStore({
        ...storeData,
        brandId,
        image: storeData.image || "",
      });
      if (response.success) {
        toast.success(response.message);
        await fetchStores(); // Refresh store list
        setIsDialogOpen(false); // Close dialog
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while saving the store.");
      console.error("Error saving store:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch stores on component mount
  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      {/* Header */}
      <Header
        onAddStore={() => setIsDialogOpen(true)} // Open Add Store Dialog
      />

      {/* Store List */}
      <StoreList stores={stores} loading={loading} />

      {/* Add Store Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Add New Store</DialogTitle>
          <StoreForm
            initialData={null} // No initial data for adding a new store
            onSave={handleSaveStore}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
