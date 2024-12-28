"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SpecialEvent } from "./types";
import Image from "next/image";

export const SpecialEventFormDialog = ({
  isOpen,
  onClose,
  onSave,
  event,
  brandId,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<SpecialEvent, "id">) => void;
  event: SpecialEvent | null;
  brandId: string;
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState<Omit<SpecialEvent, "id">>({
    name: "",
    description: "",
    image: null,
    brandId,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({ ...event, brandId });
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
        brandId,
        startDate: "",
        endDate: "",
      });
    }
  }, [event, brandId]);

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
        <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
        <form className="space-y-4">
          <Input
            placeholder="Event Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Textarea
            placeholder="Event Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {/* <Input type="file" accept="image/*" onChange={handleImageUpload} />
           */}
          <Button
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("imageUpload")?.click();
            }}
          >
            Upload Image
          </Button>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {formData.image && (
            <Image
              src={formData.image}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-auto mt-4 rounded-md"
            />
          )}
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, startDate: e.target.value }))
            }
          />
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, endDate: e.target.value }))
            }
          />
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : event
              ? "Save Changes"
              : "Create Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
