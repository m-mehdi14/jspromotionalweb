"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchCouponGiftsByBrand } from "@/actions/brand/coupon-gifts/fetch-coupon";
import { saveCouponGift } from "@/actions/brand/coupon-gifts/save-coupon";
import { editCouponGift } from "@/actions/brand/coupon-gifts/edit-coupon";
import { deleteCouponGift } from "@/actions/brand/coupon-gifts/delete-coupon";
import { CouponGiftList } from "./CouponGiftList";
import { CouponGiftFormDialog } from "./CouponGiftFormDialog";
import { Button } from "@/components/ui/button";

const BrandCouponGifts = ({ brandId }: { brandId: string }) => {
  const [couponGifts, setCouponGifts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCouponGiftsByBrand(brandId);
      setCouponGifts(data);
    } catch (error) {
      console.error("Error fetching coupon gifts:", error);
      toast.error("Failed to fetch coupon gifts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCoupon = async (couponData) => {
    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        await editCouponGift(editingCoupon.id, couponData);
        toast.success("Coupon updated successfully!");
      } else {
        await saveCouponGift({ ...couponData, brandId });
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

  const handleDeleteCoupon = async (couponId) => {
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
    fetchCoupons();
  }, [brandId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Coupon Gifts</h1>
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

      {/* Coupon List */}
      <CouponGiftList
        couponGifts={couponGifts}
        isLoading={isLoading}
        onEdit={(coupon) => {
          setEditingCoupon(coupon);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteCoupon}
      />

      {/* Add/Edit Coupon Dialog */}
      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveCoupon}
        coupon={editingCoupon}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BrandCouponGifts;
