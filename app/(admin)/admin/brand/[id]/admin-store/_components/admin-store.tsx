"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import Header from "./Header";
import StoreList from "./StoreList";
import StoreForm from "./StoreForm";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { saveStore } from "@/actions/admin/brand/store/save-store";
import { fetchStoresByBrand } from "@/actions/admin/brand/store/fetch-stores";
import { deleteStore } from "@/actions/admin/brand/store/delete-store";
import { editStore } from "@/actions/admin/brand/store/edit-store";
import { Store } from "./types";

export const AdminStore = ({ brandId }: { brandId: string }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [selectedStoreName, setSelectedStoreName] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStoresByBrand(brandId);
      setStores((data as Store[]) || []);
    } catch (error) {
      console.error("Error fetching stores:", error);
      toast.error("Failed to fetch stores.");
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  // const handleSaveStore = async (
  //   storeData: Omit<Store, "id" | "brandId"> & { password: string }
  // ) => {
  //   try {
  //     setIsSubmitting(true);
  //     const response = editingStore
  //       ? await editStore({
  //           storeId: editingStore.id,
  //           brandId,
  //           name: storeData.name,
  //           email: storeData.email,
  //           password: storeData.password,
  //           description: storeData.description,
  //           image: storeData.image || undefined,
  //           postalCode: storeData.postalCode,
  //         })
  //       : await saveStore({
  //           ...storeData,
  //           brandId,
  //           image: storeData.image || "",
  //         });

  //     if (response.success) {
  //       toast.success(response.message);
  //       fetchStores();
  //       setIsDialogOpen(false);
  //       setEditingStore(null);
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error saving store:", error);
  //     toast.error("An unexpected error occurred while saving the store.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSaveStore = async (
    storeData: Omit<Store, "id" | "brandId"> & { password: string }
  ) => {
    setIsSubmitting(true);

    try {
      const isEditing = Boolean(editingStore);
      const payload = {
        ...storeData,
        brandId,
        image: storeData.image || "", // Ensures image is always a string
      };

      const response = isEditing
        ? await editStore({ storeId: editingStore!.id, ...payload })
        : await saveStore(payload);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);

      // Refresh Store List
      await fetchStores();

      // Reset Form State
      setIsDialogOpen(false);
      setEditingStore(null);
    } catch (error) {
      console.error("[handleSaveStore] Error:", error);
      toast.error("An unexpected error occurred while saving the store.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStore = async () => {
    setLoading(true);
    if (!selectedStoreId) return;

    try {
      const response = await deleteStore({
        brandId,
        storeId: selectedStoreId,
      });

      if (response.success) {
        toast.success(response.message);
        fetchStores();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting store:", error);
      toast.error("An error occurred while deleting the store.");
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setSelectedStoreId(null);
      setSelectedStoreName(null);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <>
      <Header
        brandId={brandId}
        onAddStore={() => {
          setEditingStore(null);
          setIsDialogOpen(true);
        }}
      />

      <StoreList
        // @ts-expect-error ignore
        stores={stores}
        loading={loading}
        onEdit={(store) => {
          console.log("🚀 ~ Store selected for editing:", store);
          // @ts-expect-error ignore
          setEditingStore(store);
          setIsDialogOpen(true);
        }}
        onDelete={(id, name) => {
          setSelectedStoreId(id);
          setSelectedStoreName(name);
          setIsDeleteDialogOpen(true);
        }}
        brandId={brandId}
      />

      {/* Add/Edit Store Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>
            {editingStore ? "Edit Store" : "Add New Store"}
          </DialogTitle>
          <StoreForm
            // @ts-expect-error ignore
            initialData={editingStore}
            // @ts-expect-error ignore
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
        itemName={selectedStoreName || "this store"}
        isloading={loading}
      />
    </>
  );
};
