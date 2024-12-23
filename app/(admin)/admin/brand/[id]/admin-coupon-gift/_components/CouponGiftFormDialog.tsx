"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CouponGift } from "./types";

export const CouponGiftFormDialog = ({
  isOpen,
  onClose,
  onSave,
  coupon,
  brandId,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<CouponGift, "id">) => void;
  coupon: CouponGift | null;
  brandId: string;
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState<Omit<CouponGift, "id">>({
    name: "",
    code: "",
    discount: "",
    image: null,
    brandId,
    startDate: "",
    endDate: "",
    usageLimit: 0,
  });

  useEffect(() => {
    if (coupon) {
      setFormData({ ...coupon, brandId });
    } else {
      setFormData({
        name: "",
        code: "",
        discount: "",
        image: null,
        brandId,
        startDate: "",
        endDate: "",
        usageLimit: 0,
      });
    }
  }, [coupon, brandId]);

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

  const handleGenerateCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission or default button behavior
    const generatedCode = `COUPON-${Math.random()
      .toString(36)
      .substr(2, 8)
      .toUpperCase()}`;
    setFormData((prev) => ({ ...prev, code: generatedCode }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission default behavior
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{coupon ? "Edit Coupon" : "Add New Coupon"}</DialogTitle>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Coupon Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Coupon Code"
              value={formData.code}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, code: e.target.value }))
              }
            />
            <Button variant="secondary" onClick={handleGenerateCode}>
              Generate Code
            </Button>
          </div>
          <Input
            placeholder="Discount (%)"
            type="text"
            value={formData.discount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                discount: e.target.value,
              }))
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
          <Input
            placeholder="Usage Limit"
            type="number"
            value={formData.usageLimit}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                usageLimit: Number(e.target.value),
              }))
            }
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : coupon
              ? "Save Changes"
              : "Create Coupon"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
