"use client";

import React, { useState, useEffect, useCallback } from "react";
import { CouponGift } from "./types";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CouponGiftList } from "./CouponGiftList";
import { CouponGiftFormDialog } from "./CouponGiftFormDialog";
import { fetchCouponGifts } from "@/actions/admin/brand/coupon-gift/fetch-coupon-gifts";
import { editCouponGift } from "@/actions/admin/brand/coupon-gift/edit-coupon-gift";
import { saveCouponGift } from "@/actions/admin/brand/coupon-gift/save-coupon-gift";
import { deleteCouponGift } from "@/actions/admin/brand/coupon-gift/delete-coupon-gift";

const AdminCouponGifts = ({ brandId }: { brandId: string }) => {
  const [coupons, setCoupons] = useState<CouponGift[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponGift | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchCouponGifts(brandId);
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupon gifts:", error);
      toast.error("Failed to fetch coupon gifts.");
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  // const handleSaveCoupon = async (couponData: Omit<CouponGift, "id">) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (editingCoupon) {
  //       const response = await editCouponGift(editingCoupon.id, {
  //         ...couponData,
  //         image: couponData.image ?? undefined,
  //       });
  //       if (response.success) {
  //         toast.success("Coupon updated successfully!");
  //       } else {
  //         toast.error(response.message);
  //         return;
  //       }
  //     } else {
  //       await saveCouponGift({
  //         ...couponData,
  //         image: couponData.image ?? undefined,
  //       });
  //       toast.success("Coupon created successfully!");
  //     }
  //     await fetchCoupons();
  //     setIsDialogOpen(false);
  //     setEditingCoupon(null);
  //   } catch (error) {
  //     console.error("Error saving coupon:", error);
  //     toast.error("An unexpected error occurred.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSaveCoupon = async (couponData: Omit<CouponGift, "id">) => {
    setIsSubmitting(true);

    try {
      const isEditing = Boolean(editingCoupon);
      const payload = {
        ...couponData,
        image: couponData?.image || undefined, // Ensures empty strings are converted to `undefined`
      };

      const response = isEditing
        ? await editCouponGift(editingCoupon!.id, payload)
        : await saveCouponGift(payload);

      if (response.success !== true) {
        toast.error(response.message);
        return;
      }

      toast.success(
        isEditing
          ? "Coupon updated successfully!"
          : "Coupon created successfully!"
      );

      // Refresh Coupons List
      await fetchCoupons();

      // Reset Form States
      setIsDialogOpen(false);
      setEditingCoupon(null);
    } catch (error) {
      console.error("[handleSaveCoupon] Error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    setIsDeleting(couponId);
    try {
      const response = await deleteCouponGift(couponId);
      if (response.success) {
        toast.success("Coupon deleted successfully!");
        setCoupons((prev) => prev.filter((coupon) => coupon.id !== couponId));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditCoupon = (coupon: CouponGift) => {
    setEditingCoupon(coupon);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Coupon Gifts</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            setEditingCoupon(null);
            setIsDialogOpen(true);
          }}
        >
          Add New Coupon
        </Button>
      </header>

      <CouponGiftList
        coupons={coupons}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onEdit={handleEditCoupon}
        onDelete={handleDeleteCoupon}
      />

      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCoupon}
        coupon={editingCoupon}
        brandId={brandId}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminCouponGifts;
