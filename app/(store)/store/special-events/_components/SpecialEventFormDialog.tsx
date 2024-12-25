"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const SpecialEventFormDialog = ({
  isOpen,
  onClose,
  onSave,
  event,
  isSubmitting,
  storeId,
}: {
  isOpen: boolean;
  onClose: () => void;
  // @ts-expect-error ignore
  onSave: (data) => void;
  event: {
    name: string;
    description: string;
    image: string | null;
    startDate: string;
    endDate: string;
    storeId: string;
  } | null;
  isSubmitting: boolean;
  storeId: string;
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    image: string | ArrayBuffer | null;
    startDate: string;
    endDate: string;
    storeId: string;
  }>({
    name: "",
    description: "",
    image: null,
    startDate: "",
    endDate: "",
    storeId,
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else {
      setFormData({
        name: "",
        description: "",
        image: null,
        startDate: "",
        endDate: "",
        storeId,
      });
    }
  }, [event, storeId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <DialogTitle>
          {event ? "Edit Special Event" : "Add New Special Event"}
        </DialogTitle>
        <form className="space-y-4">
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
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
          {typeof formData.image === "string" && (
            <Image
              src={formData.image}
              alt="Event"
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
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-${
              isSubmitting ? "gray" : "green"
            }-600 hover:bg-green-700`}
          >
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
