"use client";

import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { fetchCouponGiftsByStore } from "@/actions/store/coupon-gifts/fetch-coupon-gifts";
import { editCouponGift } from "@/actions/store/coupon-gifts/edit-coupon-gifts";
import { saveCouponGift } from "@/actions/store/coupon-gifts/save-coupon-gift";
import { deleteCouponGift } from "@/actions/store/coupon-gifts/delete-coupon-gifts";
import { CouponGiftList } from "./CouponGiftList";
import { CouponGiftFormDialog } from "./CouponGiftFormDialog";

const StoreCouponGifts = () => {
  const { user } = useAuth();
  const storeId = user?.uid; // Get storeId from auth context
  const [coupons, setCoupons] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<{ id: string } | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCoupons = useCallback(async () => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchCouponGiftsByStore(storeId);
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupon gifts:", error);
      toast.error("Failed to fetch coupon gifts.");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  // @ts-expect-error ignore
  const handleSaveCoupon = async (couponData) => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        await editCouponGift(editingCoupon.id, couponData);
        toast.success("Coupon updated successfully!");
      } else {
        await saveCouponGift({ ...couponData, storeId });
        toast.success("Coupon created successfully!");
      }
      await fetchCoupons();
      setIsDialogOpen(false);
      setEditingCoupon(null);
    } catch (error) {
      console.error("Error saving coupon gift:", error);
      toast.error("Failed to save coupon gift.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      await deleteCouponGift(couponId);
      toast.success("Coupon deleted successfully!");
      await fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon gift:", error);
      toast.error("Failed to delete coupon gift.");
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchCoupons();
    }
  }, [storeId, fetchCoupons]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Coupon Gifts for Store
        </h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            setIsDialogOpen(true);
            setEditingCoupon(null);
          }}
        >
          Add New Coupon
        </Button>
      </header>

      {/* Coupon Gift List */}
      <CouponGiftList
        // @ts-expect-error ignore
        coupons={coupons}
        isLoading={isLoading}
        onEdit={(coupon) => {
          setEditingCoupon(coupon);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteCoupon}
      />

      {/* Add/Edit Coupon Gift Dialog */}
      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCoupon}
        // @ts-expect-error ignore
        coupon={editingCoupon}
        isSubmitting={isSubmitting}
        // @ts-expect-error ignore
        storeId={storeId}
      />
    </div>
  );
};

export default StoreCouponGifts;
