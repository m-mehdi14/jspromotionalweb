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
        coupon.name?.toLowerCase().includes(searchQuery.toLowerCase()) || // Guarding `name`
        coupon.description?.toLowerCase().includes(searchQuery.toLowerCase()) // Guarding `description`
    );
    setFilteredCoupons(filtered);
  }, [searchQuery, coupons]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Coupon Gifts</h1>

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
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      ) : filteredCoupons.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Store/Brand ID</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Usage Limit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>{coupon.id}</TableCell>
                <TableCell className="font-medium">
                  {coupon.name || "N/A"}
                </TableCell>
                <TableCell>{coupon.code || "N/A"}</TableCell>
                <TableCell>
                  {coupon.storeId || coupon.brandId || "N/A"}
                </TableCell>
                <TableCell>{coupon.startDate || "N/A"}</TableCell>
                <TableCell>{coupon.endDate || "N/A"}</TableCell>
                <TableCell>{coupon.usageLimit || "Unlimited"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">No coupon gifts found.</p>
      )}
    </div>
  );
};
