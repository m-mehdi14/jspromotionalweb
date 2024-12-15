"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { fetchStoresByBrand } from "@/actions/admin/brand/store/fetch-stores";
import { saveStore } from "@/actions/admin/brand/store/save-store";
import { editStore } from "@/actions/admin/brand/store/edit-store";
import { deleteStore } from "@/actions/admin/brand/store/delete-store"; // Delete Store Action
import Header from "./Header";
import StoreList from "./StoreList";
import StoreForm from "./StoreForm";
import { Store } from "./types";
import DeleteConfirmationDialog from "@/app/(admin)/admin/brand/_components/DeleteConfirmationDialog";

interface BrandStoreProps {
  brandId: string;
}

export const BrandStore: React.FC<BrandStoreProps> = ({ brandId }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

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

  // Handle save or edit store action
  const handleSaveStore = async (
    storeData: Omit<Store, "id" | "brandId"> & { password?: string }
  ) => {
    setIsSubmitting(true);
    try {
      const response = editingStore
        ? await editStore({
            ...storeData,
            storeId: editingStore.id as string,
            brandId,
            image: storeData.image || editingStore.image || "",
          })
        : await saveStore({
            ...storeData,
            brandId,
            image: storeData.image || "",
          });

      if (response.success) {
        toast.success(response.message);
        await fetchStores(); // Refresh store list
        setIsDialogOpen(false);
        setEditingStore(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        `An error occurred while ${
          editingStore ? "updating" : "saving"
        } the store.`
      );
      console.error(
        `Error ${editingStore ? "updating" : "saving"} store:`,
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete store action
  const handleDeleteStore = async () => {
    setIsSubmitting(true);
    if (!selectedStore) return;

    try {
      const response = await deleteStore({
        brandId,
        storeId: selectedStore.id as string,
      });

      if (response.success) {
        toast.success(response.message);
        await fetchStores(); // Refresh store list
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the store.");
      console.error("Error deleting store:", error);
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setSelectedStore(null);
    }
  };

  // Open dialog for editing a store
  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    setIsDialogOpen(true);
  };

  // Open confirmation dialog for deleting a store
  const handleConfirmDelete = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  // Fetch stores on component mount
  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      {/* Header */}
      <Header
        onAddStore={() => {
          setEditingStore(null);
          setIsDialogOpen(true);
        }}
      />

      {/* Store List */}
      <StoreList
        stores={stores}
        loading={loading}
        onEdit={handleEditStore}
        onDelete={
          (id, name) => handleConfirmDelete({ id, name } as Store) // Trigger delete confirmation
        }
      />

      {/* Add/Edit Store Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>
            {editingStore ? "Edit Store" : "Add New Store"}
          </DialogTitle>
          <StoreForm
            initialData={editingStore}
            onSave={handleSaveStore}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteStore}
        itemName={selectedStore?.name || "this store"}
        isLoading={isSubmitting}
      />
    </div>
  );
};
