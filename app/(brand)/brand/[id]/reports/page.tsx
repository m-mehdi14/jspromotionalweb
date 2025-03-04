"use client";

import React, { JSX, useEffect, useState } from "react";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FaCalendarAlt, FaCheckCircle, FaHome } from "react-icons/fa";
import {
  fetchCouponCountByBrand,
  fetchcouponGiftsByBrand,
  fetchFlyersByBrand,
  fetchFlyersCountByBrand,
  fetchspecialEventsByBrand,
  fetchSpecialEventsCountByBrand,
  fetchStoresByBrand,
  fetchStoresCountByBrand,
} from "@/actions/brand/count-values";
import { useSearchParams } from "next/navigation";
import { BrandReports } from "./_components/reports";

interface Metric {
  label: string;
  value: number;
  icon: JSX.Element;
}

const BrandReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [storesData, setstoresData] = useState([]);
  const [specialEventsData, setspecialEventsData] = useState([]);
  const [flyersData, setflyersData] = useState([]);
  const [couponGiftsData, setcouponGiftsData] = useState([]);
  const searchParams = useSearchParams();

  // Extract startDate and endDate from search params
  const startDate = searchParams.get("startDate") || ""; // Default to empty string if not provided
  console.log("🚀 ~ startDate:", startDate);
  const endDate = searchParams.get("endDate") || ""; // Default to empty string if not provided
  console.log("🚀 ~ endDate:", endDate);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user?.uid) return;

      setLoading(true);
      setError("");

      try {
        const [
          stores,
          specialEvents,
          flyers,
          coupon,
          storesData,
          specialEventsData,
          flyersData,
          couponData,
        ] = await Promise.all([
          // fetchStoresCountByBrand(user.uid),
          // fetchSpecialEventsCountByBrand(user.uid),
          // fetchFlyersCountByBrand(user.uid),
          // fetchCouponCountByBrand(user?.uid),
          fetchStoresCountByBrand(user.uid, startDate, endDate),
          fetchSpecialEventsCountByBrand(user.uid, startDate, endDate),
          fetchFlyersCountByBrand(user.uid, startDate, endDate),
          fetchCouponCountByBrand(user.uid, startDate, endDate),
          fetchStoresByBrand(user.uid, startDate, endDate),
          fetchspecialEventsByBrand(user.uid, startDate, endDate),
          fetchFlyersByBrand(user.uid, startDate, endDate),
          fetchcouponGiftsByBrand(user.uid, startDate, endDate),
        ]);

        // @ts-expect-error ignore
        setstoresData(storesData);

        // @ts-expect-error ignore
        setspecialEventsData(specialEventsData);

        // @ts-expect-error ignore
        setflyersData(flyersData);

        // @ts-expect-error ignore
        setcouponGiftsData(couponData);

        setMetrics([
          {
            label: "Stores",
            value: stores,
            icon: <FaHome className="text-3xl text-gray-600" />,
          },
          {
            label: "Special Events",
            value: specialEvents,
            icon: <FaCalendarAlt className="text-3xl text-gray-600" />,
          },
          {
            label: "Flyers",
            value: flyers,
            icon: <FaCheckCircle className="text-3xl text-gray-600" />,
          },
          {
            label: "Coupon Gifts",
            value: coupon,
            icon: <FaCheckCircle className="text-3xl text-gray-600" />,
          },
        ]);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.uid, startDate, endDate]);

  return (
    <RoleBasedRoute allowedRoles={["brand"]}>
      <div className="p-6">
        {loading ? (
          <p>Loading metrics...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <BrandReports
            metrics={metrics}
            // @ts-expect-error ignore
            storesData={storesData}
            // @ts-expect-error ignore
            specialEvents={specialEventsData}
            // @ts-expect-error ignore
            flyersData={flyersData}
            // @ts-expect-error ignore
            couponGiftsData={couponGiftsData}
          />
        )}
      </div>
    </RoleBasedRoute>
  );
};

export default BrandReportsPage;
