"use client";

import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Coupon {
  name: string;
  code: string;
  discount: string;
  image: string | null;
  startDate: string;
  endDate: string;
  usageLimit: number;
  storeId: string;
}

interface CouponGiftFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: Coupon) => void;
  coupon?: Coupon;
  isSubmitting: boolean;
  storeId: string;
}

export const CouponGiftFormDialog: React.FC<CouponGiftFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  coupon,
  isSubmitting,
  storeId,
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    code: string;
    discount: string;
    image: string | null;
    startDate: string;
    endDate: string;
    usageLimit: number;
    storeId: string;
  }>({
    name: "",
    code: "",
    discount: "",
    image: null,
    startDate: "",
    endDate: "",
    usageLimit: 0,
    storeId,
  });

  useEffect(() => {
    if (coupon) {
      setFormData({ ...coupon, storeId });
    } else {
      setFormData({
        name: "",
        code: "",
        discount: "",
        image: null,
        startDate: "",
        endDate: "",
        usageLimit: 0,
        storeId,
      });
    }
  }, [coupon, storeId]);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prev) => ({ ...prev, image: reader.result as string }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleGenerateCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const generatedCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    setFormData((prev) => ({ ...prev, code: generatedCode }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>
          {coupon ? "Edit Coupon Gift" : "Add New Coupon Gift"}
        </DialogTitle>
        <form className="space-y-4">
          <Input
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Code"
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
            type="number"
            value={formData.discount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, discount: e.target.value }))
            }
          />
          {/* <Input type="file" accept="image/*" onChange={handleImageUpload} />
          <Image
            src={formData.image || "https://via.placeholder.com/128"}
            alt="Coupon"
            width={128}
            height={128}
            className="w-32 h-auto mt-4 rounded-md"
          /> */}
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
                usageLimit: parseInt(e.target.value, 10),
              }))
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
              : coupon
              ? "Save Changes"
              : "Create Coupon"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
