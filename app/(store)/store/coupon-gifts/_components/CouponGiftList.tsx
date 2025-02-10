"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PencilIcon, Trash } from "lucide-react";

interface Coupon {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  code?: string;
  discount: string;
  startDate: string;
  endDate: string;
}

interface CouponGiftListProps {
  coupons: Coupon[];
  isLoading: boolean;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

export const CouponGiftList: React.FC<CouponGiftListProps> = ({
  coupons,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter coupons based on the search query
  const filteredCoupons = coupons.filter((coupon) => {
    const name = coupon.name || ""; // Ensure name is a string
    const description = coupon.description || ""; // Ensure description is a string
    const code = coupon.code || ""; // Ensure code is a string

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const paginatedCoupons = filteredCoupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="text-center">Loading coupon gifts...</div>;
  }

  if (filteredCoupons.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No coupon gifts found matching your search query.
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name, description, or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="min-w-full border-collapse ">
          <thead>
            <tr className="">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Code
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Discount
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Valid From
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Valid To
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
                className={`border-b ${index % 2 === 0 ? "" : "bg-white"
                  }`}
              >
                <td className="px-4 py-2">
                  {coupon.image ? (
                    <Image
                      src={coupon.image}
                      alt={coupon.name || "Coupon"}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2">{coupon.name || "N/A"}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {coupon.description || "N/A"}
                </td>
                <td className="px-4 py-2">{coupon.code || "N/A"}</td>
                <td className="px-4 py-2">{coupon.discount}</td>
                <td className="px-4 py-2">{coupon.startDate}</td>
                <td className="px-4 py-2">{coupon.endDate}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button variant="secondary" onClick={() => onEdit(coupon)}>

                    <PencilIcon />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(coupon.id)}
                  >

                    <Trash />
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
