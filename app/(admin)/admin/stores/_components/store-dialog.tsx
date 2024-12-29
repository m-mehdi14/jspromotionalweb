"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveStore } from "@/actions/admin/brand/store/save-store";
import { editStore } from "@/actions/admin/brand/store/edit-store";

interface Store {
  id?: string;
  brandId: string;
  name: string;
  email: string;
  password?: string; // Only used for adding a store
  description: string;
  postalCode?: string;
  image?: string;
  createdAt?: string;
}

interface AddEditStoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveComplete: (store: Store) => void;
  store?: Store; // Optional for editing
  isSaving: boolean;
}

export const AddEditStoreDialog: React.FC<AddEditStoreDialogProps> = ({
  isOpen,
  onClose,
  onSaveComplete,
  store,
  isSaving,
}) => {
  const [formData, setFormData] = useState<Store>({
    id: store?.id || "",
    brandId: store?.brandId || "",
    name: store?.name || "",
    email: store?.email || "",
    password: "",
    description: store?.description || "",
    postalCode: store?.postalCode || "",
    image: store?.image || "",
  });

  const handleSave = async () => {
    if (!formData.name || !formData.email || !formData.description) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      if (store) {
        // Edit store
        const response = await editStore({
          storeId: formData.id!,
          brandId: formData.brandId,
          name: formData.name,
          email: formData.email,
          description: formData.description,
          image: formData.image,
          postalCode: formData.postalCode,
        });

        if (response.success) {
          toast.success(response.message);
          onSaveComplete(formData);
          onClose();
        } else {
          toast.error(response.message);
        }
      } else {
        // Add store
        const response = await saveStore({
          name: formData.name,
          email: formData.email,
          password: formData.password!,
          description: formData.description,
          image: formData.image || "",
          brandId: formData.brandId,
          postalCode: formData.postalCode || "",
        });

        if (response.success) {
          toast.success(response.message);
          onSaveComplete({
            ...formData,
            id: crypto.randomUUID(), // Temporary ID
            createdAt: new Date().toISOString(),
          });
          onClose();
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error("Error saving store:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{store ? "Edit Store" : "Add Store"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Store Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {!store && (
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}
          <Input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
