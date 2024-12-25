"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CouponGift {
  id: string;
  name: string;
  code: string;
  discount: number;
  image?: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
}

interface CouponGiftListProps {
  couponGifts: CouponGift[];
  isLoading: boolean;
  onEdit: (coupon: CouponGift) => void;
  onDelete: (id: string) => void;
}

export const CouponGiftList: React.FC<CouponGiftListProps> = ({
  couponGifts,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="text-center">Loading coupon gifts...</div>;
  }

  if (couponGifts.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No coupon gifts found. Add a new one to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {couponGifts.map((coupon) => (
        <div key={coupon.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{coupon.name}</h2>
          <p>
            <strong>Code:</strong> {coupon.code}
          </p>
          <p>
            <strong>Discount:</strong> {coupon.discount}%
          </p>
          <Image
            src={(coupon.image as string) || "https://via.placeholder.com/128"}
            alt={coupon.name}
            className="mt-4 w-full rounded-md"
            layout="responsive"
            width={500}
            height={300}
          />
          <p>
            <strong>Start Date:</strong> {coupon.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {coupon.endDate}
          </p>
          <p>
            <strong>Usage Limit:</strong> {coupon.usageLimit}
          </p>
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="secondary" onClick={() => onEdit(coupon)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(coupon.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
