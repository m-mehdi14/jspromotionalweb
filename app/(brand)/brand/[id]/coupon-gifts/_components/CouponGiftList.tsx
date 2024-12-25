"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export const CouponGiftList = ({
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
          {coupon.image && (
            <img
              src={coupon.image}
              alt={coupon.name}
              className="mt-4 w-full rounded-md"
            />
          )}
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
