// "use client";

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
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Image</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Code</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Discount</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Start Date</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">End Date</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Usage Limit</th>
            <th className="px-4 py-2 text-center text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {couponGifts.map((coupon, index) => (
            <tr
              key={coupon.id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="px-4 py-2">
                <Image
                  src={coupon.image || "https://via.placeholder.com/128"}
                  alt={coupon.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
              </td>
              <td className="px-4 py-2">{coupon.name}</td>
              <td className="px-4 py-2">{coupon.code}</td>
              <td className="px-4 py-2">{coupon.discount}%</td>
              <td className="px-4 py-2">{coupon.startDate}</td>
              <td className="px-4 py-2">{coupon.endDate}</td>
              <td className="px-4 py-2">{coupon.usageLimit}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Button variant="secondary" onClick={() => onEdit(coupon)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(coupon.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
