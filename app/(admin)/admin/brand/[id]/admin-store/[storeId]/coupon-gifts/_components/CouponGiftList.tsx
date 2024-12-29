"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CouponGiftList = ({
  coupons,
  isLoading,
  onEdit,
  onDelete,
}: {
  coupons: {
    id: string;
    name: string;
    code: string;
    discount: string;
    image?: string;
    startDate: string;
    endDate: string;
    usageLimit: number;
  }[];
  isLoading: boolean;
  // @ts-expect-error ignore
  onEdit: (coupon) => void;
  onDelete: (couponId: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const paginatedCoupons = coupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(itemsPerPage)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No coupon gifts found. Add a new one to get started!
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="rounded-lg border border-gray-200 shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100 text-blue-900">
            <TableHead className="py-4 px-6">Image</TableHead>
            <TableHead className="py-4 px-6">Name</TableHead>
            <TableHead className="py-4 px-6">Code</TableHead>
            <TableHead className="py-4 px-6">Discount</TableHead>
            <TableHead className="py-4 px-6">Start Date</TableHead>
            <TableHead className="py-4 px-6">End Date</TableHead>
            <TableHead className="py-4 px-6">Usage Limit</TableHead>
            <TableHead className="py-4 px-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCoupons.map((coupon) => (
            <TableRow
              key={coupon.id}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="py-4 px-6">
                {coupon.image ? (
                  <Image
                    src={coupon.image}
                    alt={coupon.name}
                    width={60}
                    height={60}
                    className="rounded-md shadow-sm"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-700">
                {coupon.name}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {coupon.code}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {coupon.discount}%
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(coupon.startDate))}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(coupon.endDate))}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {coupon.usageLimit}
              </TableCell>
              <TableCell className="py-4 px-6 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(coupon);
                          }}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Edit className="w-5 h-5 text-blue-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Coupon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(coupon.id);
                          }}
                          className="p-2 hover:bg-red-100"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Coupon</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
