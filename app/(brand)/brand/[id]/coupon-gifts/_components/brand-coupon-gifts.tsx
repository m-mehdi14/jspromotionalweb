"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchCouponGiftsByBrand } from "@/actions/brand/coupon-gifts/fetch-coupon";
import { saveCouponGift } from "@/actions/brand/coupon-gifts/save-coupon";
import { editCouponGift } from "@/actions/brand/coupon-gifts/edit-coupon";
import { deleteCouponGift } from "@/actions/brand/coupon-gifts/delete-coupon";
import { CouponGiftList } from "./CouponGiftList";
import { CouponGiftFormDialog } from "./CouponGiftFormDialog";
import { Button } from "@/components/ui/button";

interface CouponData {
  id: string;
  name: string;
  discount: number;
  expirationDate: string;
  code: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
  // Add other fields as necessary
}

// Removed duplicate CouponGift interface

const BrandCouponGifts = ({ brandId }: { brandId: string }) => {
  const [couponGifts, setCouponGifts] = useState<CouponData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = (await fetchCouponGiftsByBrand(brandId)) as CouponData[];
      setCouponGifts(data);
    } catch (error) {
      console.error("Error fetching coupon gifts:", error);
      toast.error("Failed to fetch coupon gifts.");
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  // interface CouponGift {
  //   id: string;
  //   [key: string]: any; // Adjust this according to the actual structure of CouponGift
  // }

  const handleSaveCoupon = async (couponData: CouponData) => {
    setIsSubmitting(true);
    try {
      if (editingCoupon) {
        await editCouponGift(editingCoupon.id, couponData);
        toast.success("Coupon updated successfully!");
      } else {
        await saveCouponGift({
          ...couponData,
          brandId,
          code: "defaultCode", // Replace with actual code
          startDate: "2023-01-01", // Replace with actual start date
          endDate: "2023-12-31", // Replace with actual end date
          usageLimit: 100, // Replace with actual usage limit
        });
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

  const handleDeleteCoupon = async (couponId: string): Promise<void> => {
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
  }, [brandId, fetchCoupons]);

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

      <CouponGiftList
        couponGifts={couponGifts}
        isLoading={isLoading}
        //@ts-expect-error ignore this error
        onEdit={(coupon: CouponData) => {
          setEditingCoupon(coupon);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteCoupon}
      />

      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        //@ts-expect-error ignore this error
        onSave={handleSaveCoupon}
        //@ts-expect-error ignore this error
        coupon={editingCoupon}
        isSubmitting={isSubmitting}
      />
      <CouponGiftFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        //@ts-expect-error ignore this error
        onSave={handleSaveCoupon}
        //@ts-expect-error ignore this error
        coupon={editingCoupon}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BrandCouponGifts;
