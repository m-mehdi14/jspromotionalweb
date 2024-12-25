"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const CouponGiftList = ({ coupons, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <div className="text-center">Loading coupon gifts...</div>;
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400">No coupon gifts found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <div key={coupon.id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{coupon.name}</h2>
          <p className="text-gray-500">{coupon.description}</p>
          {coupon.image && (
            <Image
              src={coupon.image}
              alt={coupon.name}
              width={200}
              height={200}
              className="w-full h-auto mt-4 rounded-md"
            />
          )}
          <p>
            <strong>Code:</strong> {coupon.code}
          </p>
          <p>
            <strong>Discount:</strong> {coupon.discount}
          </p>
          <p>
            <strong>Valid From:</strong> {coupon.startDate}
          </p>
          <p>
            <strong>Valid To:</strong> {coupon.endDate}
          </p>
          <div className="flex justify-end space-x-4 mt-4">
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
