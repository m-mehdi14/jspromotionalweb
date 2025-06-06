"use client";

import React, { JSX, useEffect, useState } from "react";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import {
  fetchCouponCountByStore,
  fetchCouponsByStore,
  fetchFlyersByStore,
  fetchFlyersCountByStore,
  fetchSpecialEventsByStore,
  fetchSpecialEventsCountByStore,
} from "@/actions/brand/count-values";
import { StoreReports } from "./_components/reports";
import { useSearchParams } from "next/navigation";

interface Metric {
  label: string;
  value: number;
  icon: JSX.Element;
}

const StoreReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [specialEventsData, setspecialEventsData] = useState([]);
  const [flyersData, setflyersData] = useState([]);
  const [couponData, setcouponData] = useState([]);
  const searchParams = useSearchParams();

  // Extract startDate and endDate from search params
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user?.uid) return;

      setLoading(true);
      setError("");

      try {
        const [
          specialEvents,
          flyers,
          coupon,
          specialEventsData,
          flyersData,
          couponData,
        ] = await Promise.all([
          // fetchSpecialEventsCountByStore(user.uid),
          // fetchFlyersCountByStore(user.uid),
          // fetchCouponCountByStore(user?.uid),
          fetchSpecialEventsCountByStore(user.uid, startDate, endDate),
          fetchFlyersCountByStore(user.uid, startDate, endDate),
          fetchCouponCountByStore(user.uid, startDate, endDate),
          fetchSpecialEventsByStore(user.uid, startDate, endDate),
          fetchFlyersByStore(user.uid, startDate, endDate),
          fetchCouponsByStore(user.uid, startDate, endDate),
        ]);

        // @ts-expect-error ignore
        setspecialEventsData(specialEventsData);
        // @ts-expect-error ignore
        setflyersData(flyersData);
        // @ts-expect-error ignore
        setcouponData(couponData);

        setMetrics([
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
    <RoleBasedRoute allowedRoles={["store"]}>
      <div className="p-6">
        {loading ? (
          <p>Loading metrics...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <StoreReports
            metrics={metrics}
            // @ts-expect-error ignore
            specialEventsData={specialEventsData}
            // @ts-expect-error ignore
            flyersData={flyersData}
            // @ts-expect-error ignore
            couponData={couponData}
          />
        )}
      </div>
    </RoleBasedRoute>
  );
};

export default StoreReportsPage;
