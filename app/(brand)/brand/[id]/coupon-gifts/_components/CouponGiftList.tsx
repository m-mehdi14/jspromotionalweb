"use client";

import React, { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(couponGifts.length / itemsPerPage);
  const paginatedCoupons = couponGifts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Code
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Discount
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                End Date
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Usage Limit
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoupons.map((coupon, index) => (
              <tr
                key={coupon.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
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
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(coupon.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
