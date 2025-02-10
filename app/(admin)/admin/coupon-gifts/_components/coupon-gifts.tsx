"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchCouponGifts } from "@/actions/admin/coupon-gifts/fetch-coupons";

interface Coupon {
  id: string;
  brandName: string;
  storeName: string;
  name?: string;
  description?: string;
  code?: string;
  storeId?: string;
  brandId?: string;
  startDate?: string;
  endDate?: string;
  usageLimit?: number;
}

export const CouponGiftsComponent = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Items per page

  // Filters
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadCoupons = async () => {
      setLoading(true);
      const response = await fetchCouponGifts();
      if (response.success) {
        setCoupons(response.data);
        setFilteredCoupons(response.data);
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    loadCoupons();
  }, []);

  // Filter Logic
  useEffect(() => {
    const filtered = coupons.filter(
      (coupon) =>
        coupon.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coupon.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCoupons(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchQuery, coupons]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white bg-black p-7 rounded-md">Coupon Gifts</h1>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center h-full space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
          ))}
        </div>
      ) : currentItems.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                {/* <TableHead>Store/Brand ID</TableHead> */}
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Usage Limit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>{coupon.id}</TableCell>
                  <TableCell className="font-medium">
                    {coupon.name || "N/A"}
                  </TableCell>
                  <TableCell>{coupon.code || "N/A"}</TableCell>
                  {/* <TableCell>
                    {coupon.storeId || coupon.brandId || "N/A"}
                  </TableCell> */}
                  <TableCell>
                    {coupon.startDate
                      ? new Date(coupon.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {coupon.endDate
                      ? new Date(coupon.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{coupon.usageLimit || "Unlimited"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="secondary"
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No coupon gifts found.</p>
      )}
    </div>
  );
};
