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
  GetScanHistoryByEmail,
  StoreCountView,
  StoreQRCode,
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
  const [qrCode, setqrCode] = useState("");
  const [countView, setcountView] = useState("");
  const [scanHistory, setscanHistory] = useState([]);

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
        const [specialEvents, flyers, qrCode, count, scanHistoryData] =
          await Promise.all([
            fetchSpecialEventsCountByStore(storeId as string),
            fetchFlyersCountByStore(storeId as string),
            StoreQRCode(user?.email as string),
            StoreCountView(user?.email as string),
            GetScanHistoryByEmail(user?.email as string),
          ]);
        // @ts-expect-error ignore
        setqrCode(qrCode);
        // @ts-expect-error ignore
        setcountView(count);
        // @ts-expect-error ignore
        setscanHistory(scanHistoryData);

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

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Logout
          </Button>

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

      {/* QR Code Section */}
      {qrCode && (
        <div className="mt-12 flex flex-col  p-6 rounded-lg  max-w-lg">
          <div className="mt-4 ">
            <p className="text-gray-600 text-2xl font-semibold">
              Scanned Count:{" "}
              <span className="text-blue-500 text-xl font-bold">
                {countView}
              </span>
            </p>
          </div>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Store QR Code
          </h2>
          <div className=" rounded-lg p-4">
            <img
              src={qrCode}
              alt="Brand QR Code"
              className="w-64 h-64 rounded-lg shadow-md"
            />
          </div>
          {/* <div className="mt-4 text-center">
            <p className="text-gray-600 text-lg font-semibold">
              Scanned Count:{" "}
              <span className="text-blue-500 text-xl font-bold">
                {countView}
              </span>
            </p>
          </div> */}
          <div className=" mt-4 ml-10 ">
            <a
              href={qrCode}
              download="brand-qr-code.png"
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              Download QR Code
            </a>
          </div>
        </div>
      )}

      {/* Scan History Section */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md text-black">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Scan History</h2>
        {scanHistory?.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  User ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Postal Code
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Scanned At
                </th>
              </tr>
            </thead>
            <tbody>
              {scanHistory?.map((scan, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">
                    {scan.userId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {scan.postalCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(scan.scannedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No scan history available.</p>
        )}
      </div>
    </div>
  );
};
