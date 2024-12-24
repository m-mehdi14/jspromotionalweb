"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const CouponGiftFormDialog = ({
  isOpen,
  onClose,
  onSave,
  coupon,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: "",
    image: null,
    startDate: "",
    endDate: "",
    usageLimit: 0,
  });

  useEffect(() => {
    if (coupon) {
      setFormData(coupon);
    } else {
      setFormData({
        name: "",
        code: "",
        discount: "",
        image: null,
        startDate: "",
        endDate: "",
        usageLimit: 0,
      });
    }
  }, [coupon]);

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

  const generateCouponCode = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission or default button behavior
    const randomCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    setFormData((prev) => ({ ...prev, code: randomCode }));
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
            <Button
              variant="secondary"
              onClick={generateCouponCode}
              disabled={isSubmitting}
            >
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
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Coupon"
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
