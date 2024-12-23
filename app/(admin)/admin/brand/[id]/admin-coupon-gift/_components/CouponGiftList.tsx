import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CouponGift } from "./types";

export const CouponGiftList = ({
  coupons,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: {
  coupons: CouponGift[];
  isLoading: boolean;
  isDeleting: string | null;
  onEdit: (coupon: CouponGift) => void;
  onDelete: (couponId: string) => void;
}) => {
  if (isLoading) {
    return <div className="text-center">Loading coupons...</div>;
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No coupons found. Add a new coupon to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <div
          key={coupon.id}
          className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-bold mb-2">{coupon.name}</h2>
          <p className="text-sm text-gray-400">Code: {coupon.code}</p>
          <p className="text-sm text-gray-400">Discount: {coupon.discount}%</p>
          <p className="text-sm text-gray-400">
            {coupon.startDate} - {coupon.endDate}
          </p>
          {coupon.image && (
            <div className="relative w-full h-48 mt-4 rounded-md overflow-hidden">
              <Image
                src={coupon.image}
                alt={coupon.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => onEdit(coupon)}>
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(coupon.id)}
              disabled={isDeleting === coupon.id}
            >
              {isDeleting === coupon.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
