"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flyer } from "../../admin-store/_components/types";

export const FlyerFormDialog = ({
  isOpen,
  onClose,
  onSave,
  flyer,
  brandId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Flyer, "id">) => void;
  flyer: Flyer | null;
  brandId: string;
}) => {
  const [formData, setFormData] = useState<Omit<Flyer, "id">>({
    title: "",
    description: "",
    image: null,
    brandId,
    storeIds: [],
    validFrom: "",
    validTo: "",
  });

  useEffect(() => {
    if (flyer) {
      setFormData({ ...flyer, brandId });
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        brandId,
        storeIds: [],
        validFrom: "",
        validTo: "",
      });
    }
  }, [flyer, brandId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
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
          <Textarea
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
          <Button onClick={handleSubmit}>
            {flyer ? "Save Changes" : "Create Flyer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
