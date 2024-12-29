/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useEffect, useState, JSX } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/AuthContext/authContext";
//import RecentOrders from "./RecentOrders";
import DashboardHeader from "./header";
import EditStoreDetails from "./EditStoreDetails";
import { User } from "lucide-react";
import {
  fetchFlyersCountByStore,
  fetchSpecialEventsCountByStore,
} from "@/actions/brand/count-values";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export const StoreMainPage = () => {
  const { handleLogout, user } = useAuth();
  interface Metric {
    label: string;
    value: number;
    icon: JSX.Element;
  }

  const [metrics, setMetrics] = useState<Metric[]>([]);
  console.log("🚀 ~ StoreMainPage ~ metrics:", metrics);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("🚀 ~ StoreMainPage ~ loading:", loading);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const storeId: string | undefined = user?.uid; // Store ID

  // Store Details Object
  const storeDetails = {
    name: user?.name || "",
    email: user?.email || "N/A",
    // @ts-expect-error
    role: user?.reloadUserInfo?.role || "store",
    // @ts-expect-error
    lastLogin: user?.metadata?.lastLoginAt
      ? // @ts-expect-error
        new Date(parseInt(user.metadata.lastLoginAt)).toLocaleString()
      : "N/A",
    // @ts-expect-error
    createdAt: user?.metadata?.createdAt
      ? // @ts-expect-error
        new Date(parseInt(user.metadata.createdAt)).toLocaleString()
      : "N/A",
  };

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch metrics data
        const [specialEvents, flyers] = await Promise.all([
          fetchSpecialEventsCountByStore(storeId as string),
          fetchFlyersCountByStore(storeId as string),
        ]);

        // Set metrics
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
        ]);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError("Failed to load metrics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [user?.uid, storeId]);

  return (
    <div className="min-h-screen bg-white text-white p-8">
      {/* Dashboard Header with User Icon */}
      <div className="flex justify-between text-black items-center mb-6">
        <DashboardHeader title="Store Dashboard" />

        {/* User Icon to Open Store Details */}
        <div className="flex items-center space-x-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-300 transition-all duration-300 ease-in-out"
                title="View Store Details"
              >
                <User className="w-6 h-6" />
                <span className="text-sm text-black">Store Info</span>
              </Button>
            </DialogTrigger>

            {/* Store Details Dialog */}
            <DialogContent>
              <DialogTitle className="mb-4">Store Details</DialogTitle>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Name:</strong> {storeDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {storeDetails.email}
                </p>
                <p>
                  <strong>Role:</strong> {storeDetails.role}
                </p>
                <p>
                  <strong>Created At:</strong> {storeDetails.createdAt}
                </p>
                <p>
                  <strong>Last Login:</strong> {storeDetails.lastLogin}
                </p>
              </div>
            </DialogContent>
          </Dialog>

          {/* Edit Store Details */}
          <EditStoreDetails
            // @ts-expect-error
            storeDetails={storeDetails}
            onUpdate={() => window.location.reload()} // Reload the page on update
          />
        </div>
      </div>

      {/* Metrics Section */}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading metrics...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="mr-4">{metric.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </p>
                <p className="text-gray-500">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-32 bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : metrics ? (
        <DashboardMetrics metrics={metrics} />
      ) : (
        <div className="text-center text-gray-300 py-8">
          No metrics available.
        </div>
      )} */}

      <div>CREATE boxes here</div>

      {/* Info Section */}
      {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-black font-bold mb-4 border-b border-gray-300 pb-2">
          Store Information
        </h2>
        <div className="space-y-4 text-gray-800">
          <div className="flex items-center">
            <span className="font-medium w-32">Name:</span>
            <span className="text-gray-600">{storeDetails.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-32">Email:</span>
            <span className="text-gray-600">{storeDetails.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-32">Role:</span>
            <span className="text-gray-600">{storeDetails.role}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-32">Created At:</span>
            <span className="text-gray-600">{storeDetails.createdAt}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium w-32">Last Login:</span>
            <span className="text-gray-600">{storeDetails.lastLogin}</span>
          </div>
        </div>
      </div> */}

      {/* Logout Button */}
      <div className="flex mt-20 justify-end mb-6">
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition duration-300"
        >
          Logout
        </Button>
      </div>

      {/* Recent Orders Section */}
      {/* <RecentOrders storeId={storeId} /> */}
    </div>
  );
};
