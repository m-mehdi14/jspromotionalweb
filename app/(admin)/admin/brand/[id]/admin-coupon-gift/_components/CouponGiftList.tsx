"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2 } from "lucide-react";
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
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No coupons found. Add a new coupon to get started!
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Valid From</TableHead>
            <TableHead>Valid To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              {/* Coupon Image */}
              <TableCell className="w-20">
                {coupon.image ? (
                  <Image
                    src={coupon.image}
                    alt={coupon.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>

              {/* Coupon Title */}
              <TableCell className="text-gray-800">{coupon.name}</TableCell>

              {/* Coupon Code */}
              <TableCell className="text-gray-800">{coupon.code}</TableCell>

              {/* Discount */}
              <TableCell className="text-gray-800">
                {coupon.discount}%
              </TableCell>

              {/* Valid From */}
              <TableCell className="text-gray-700">
                {new Date(coupon.startDate).toLocaleDateString()}
              </TableCell>

              {/* Valid To */}
              <TableCell className="text-gray-700">
                {new Date(coupon.endDate).toLocaleDateString()}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(coupon)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(coupon.id)}
                    disabled={isDeleting === coupon.id}
                  >
                    {isDeleting === coupon.id ? (
                      "Deleting..."
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
