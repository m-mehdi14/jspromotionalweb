"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchCouponGiftsByStore } from "@/actions/admin/brand/specific-store/coupon-gifts/fetch-coupon";
import { editCouponGift } from "@/actions/admin/brand/specific-store/coupon-gifts/edit-coupon";
import { saveCouponGift } from "@/actions/admin/brand/specific-store/coupon-gifts/save-coupon";
import { deleteCouponGift } from "@/actions/admin/brand/specific-store/coupon-gifts/delete-coupon";
import { CouponGiftList } from "./CouponGiftList";
import { CouponGiftFormDialog } from "./CouponGiftFormDialog";

interface AdminStoreCouponGiftsProps {
  brandId: string;
  storeId: string;
}

const AdminStoreCouponGifts = ({
  brandId,
  storeId,
}: AdminStoreCouponGiftsProps) => {
  const [couponGifts, setCouponGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCouponGifts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCouponGiftsByStore(brandId, storeId);
      setCouponGifts(data);
    } catch (error) {
      console.error("Error fetching coupon gifts:", error);
      toast.error("Failed to fetch coupon gifts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCouponGift = async (couponData) => {
    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        await editCouponGift(editingCoupon.id, couponData);
        toast.success("Coupon gift updated successfully!");
      } else {
        await saveCouponGift({ ...couponData, brandId, storeId });
        toast.success("Coupon gift created successfully!");
      }
      await fetchCouponGifts();
      setIsDialogOpen(false);
      setEditingCoupon(null);
    } catch (error) {
      console.error("Error saving coupon gift:", error);
      toast.error("Failed to save coupon gift.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCouponGift = async (couponId) => {
    try {
      await deleteCouponGift(couponId);
      toast.success("Coupon gift deleted successfully!");
      await fetchCouponGifts();
    } catch (error) {
      console.error("Error deleting coupon gift:", error);
      toast.error("Failed to delete coupon gift.");
    }
  };

  useEffect(() => {
    if (brandId && storeId) {
      fetchCouponGifts();
    }
  }, [brandId, storeId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Coupon Gifts for Store #{storeId}
        </h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            setIsDialogOpen(true);
            setEditingCoupon(null);
          }}
        >
          Add New Coupon Gift
        </Button>
      </header>

      {/* Coupon Gift List */}
      <CouponGiftList
        coupons={couponGifts}
        isLoading={isLoading}
        onEdit={(coupon) => {
          setEditingCoupon(coupon);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteCouponGift}
      />

      {/* Add/Edit Coupon Gift Dialog */}
      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCouponGift}
        coupon={editingCoupon}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminStoreCouponGifts;
