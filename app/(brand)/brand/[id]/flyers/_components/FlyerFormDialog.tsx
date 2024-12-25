"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const FlyerFormDialog = ({
  isOpen,
  onClose,
  onSave,
  flyer,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    validFrom: "",
    validTo: "",
  });

  useEffect(() => {
    if (flyer) {
      setFormData(flyer);
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        validFrom: "",
        validTo: "",
      });
    }
  }, [flyer]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{flyer ? "Edit Flyer" : "Add New Flyer"}</DialogTitle>
        <form className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="w-32 h-auto mt-4 rounded-md"
            />
          )}
          <Input
            type="date"
            value={formData.validFrom}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, validFrom: e.target.value }))
            }
          />
          <Input
            type="date"
            value={formData.validTo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, validTo: e.target.value }))
            }
          />
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-${
              isSubmitting ? "gray" : "green"
            }-600 hover:bg-green-700`}
          >
            {isSubmitting
              ? "Saving..."
              : flyer
              ? "Save Changes"
              : "Create Flyer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
