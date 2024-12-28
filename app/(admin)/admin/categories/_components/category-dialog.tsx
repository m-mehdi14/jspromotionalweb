"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CategoryFormDialog = ({
  isOpen,
  onClose,
  onSave,
  category,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string }) => void;
  category?: { name: string; description: string };
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({ name: "", description: "" });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          {category ? "Edit Category" : "Add New Category"}
        </DialogTitle>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          {/* Uncomment if you need a description field */}
          {/* <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          /> */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : category
              ? "Save Changes"
              : "Create Category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
