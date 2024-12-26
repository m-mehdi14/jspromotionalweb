"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { saveBrand } from "@/actions/admin/brand/saveBrand";
import { editBrand } from "@/actions/admin/brand/edit-brand";
import { fetchBrandsByAdmin } from "@/actions/admin/brand/fetch-brand";
import { useAuth } from "@/lib/AuthContext/authContext";
import { toast } from "sonner";
import Header from "./Header";
import BrandList from "./BrandList";
import BrandForm from "./BrandForm";
import { deleteBrand } from "@/actions/admin/brand/delete-brand";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { Brand } from "./types";

const AdminBrand = () => {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false); // Separate state for Add/Edit dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Separate state for Delete dialog
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBrands = useCallback(async () => {
    if (user?.uid) {
      setLoading(true);
      const data = await fetchBrandsByAdmin(user.uid);
      setBrands((data as Brand[]) || []);
      setLoading(false);
    }
  }, [user]);

  const handleSaveBrand = async (
    brandData: Omit<Brand, "id" | "adminId"> & { password: string }
  ) => {
    if (!user?.uid) {
      toast.error("Admin user not authenticated.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = editingBrand
        ? await editBrand({
          brandId: editingBrand.id,
          adminId: user.uid,
          name: brandData.name,
          email: brandData.email,
          description: brandData.description,
          image: brandData.image || undefined,
          postalCode: brandData.postalCode,
        })
        : await saveBrand({
          ...brandData,
          adminId: user.uid,
          image: brandData.image || "",
        });

      if (response.success === true) {
        toast.success(response.message);
        await fetchBrands();
        setIsAddEditDialogOpen(false); // Close Add/Edit dialog
        setEditingBrand(null);
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleDeleteBrand = async () => {
    setIsDeleting(true);
    if (!user?.uid || !selectedBrandId) {
      toast.error("Admin user not authenticated.");
      return;
    }

    const response = await deleteBrand({
      adminId: user.uid,
      brandId: selectedBrandId,
    });

    if (response.success) {
      toast.success(response.message);
      await fetchBrands(); // Refresh brand list
    } else {
      toast.error(response.message);
    }
    setIsDeleting(false);
    setIsDeleteDialogOpen(false); // Close Delete dialog
    setSelectedBrandId(null);
    setSelectedBrandName(null);
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        {/* Header */}
        <DialogTrigger asChild>
          <Header
            onAddBrand={() => {
              setEditingBrand(null);
              setIsAddEditDialogOpen(true); // Open Add/Edit dialog
            }}
          />
        </DialogTrigger>

        {/* Add/Edit Brand Dialog */}
        <DialogContent>
          <DialogTitle>
            {editingBrand ? "Edit Brand" : "Add New Brand"}
          </DialogTitle>
          <BrandForm
            initialData={editingBrand}
            onSave={handleSaveBrand}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      {/* Brand List */}
      <BrandList
        brands={brands}
        loading={loading}
        onEdit={(brand) => {
          setEditingBrand(brand);
          setIsAddEditDialogOpen(true);
        }}
        onDelete={(id, name) => {
          setSelectedBrandId(id);
          setSelectedBrandName(name);
          setIsDeleteDialogOpen(true);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)} // Close Delete dialog
        onConfirm={handleDeleteBrand}
        itemName={selectedBrandName || "this brand"}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminBrand;
