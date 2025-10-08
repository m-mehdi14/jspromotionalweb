"use client";

import { useState, useEffect } from "react";
import {
  BrandCountView,
  BrandQRCode,
  fetchFlyersCountByBrand,
  fetchSpecialEventsCountByBrand,
  fetchStoresCountByBrand,
  GetScanHistoryByEmailforBrand,
} from "@/actions/brand/count-values";
import { JSX } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FaHome, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

export const BrandPageComponent = () => {
  const { handleLogout, user } = useAuth();
  interface Metric {
    label: string;
    value: number;
    icon: JSX.Element;
  }

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [countView, setCountView] = useState("");
  const [scanHistory, setscanHistory] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError("");

        const [stores, specialEvents, flyers, qrCode, count, scanHistoryData] =
          await Promise.all([
            fetchStoresCountByBrand(user?.uid as string),
            fetchSpecialEventsCountByBrand(user?.uid as string),
            fetchFlyersCountByBrand(user?.uid as string),
            BrandQRCode(user?.email as string),
            BrandCountView(user?.email as string),
            GetScanHistoryByEmailforBrand(user?.email as string),
          ]);
        // @ts-expect-error ignore
        setQrCode(qrCode as string);
        // @ts-expect-error ignore
        setCountView(count as string);
        // @ts-expect-error ignore
        setscanHistory(scanHistoryData);

        setMetrics([
          {
            label: "Stores",
            value: stores,
            icon: <FaHome className="text-3xl text-blue-600" />,
          },
          {
            label: "Special Events",
            value: specialEvents,
            icon: <FaCalendarAlt className="text-3xl text-green-600" />,
          },
          {
            label: "Flyers",
            value: flyers,
            icon: <FaCheckCircle className="text-3xl text-yellow-500" />,
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
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header Section */}
      <header className="w-full flex items-center justify-between p-6 bg-black rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-white">Brand Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-400">Welcome, {user?.email || "Admin"}!</p>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <IoIosLogOut className="" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
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
      </main>
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
            Brand QR Code
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
      <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Scan History</h2>
          <div className="bg-blue-50 px-3 py-1 rounded-full">
            <span className="text-blue-600 font-medium text-sm">
              {scanHistory?.length || 0} Total Scans
            </span>
          </div>
        </div>

        {scanHistory?.length > 0 ? (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Scanned At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scanHistory?.map((scan, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium text-sm">
                                {scan?.userId?.charAt(0)?.toUpperCase() || "U"}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {scan?.userId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 mr-2">
                            <svg
                              className="h-6 w-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div className="text-sm text-gray-900 font-medium">
                            {scan?.postalCode || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 mr-2">
                            <svg
                              className="h-6 w-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-900 font-medium">
                              {new Date(scan?.scannedAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(scan?.scannedAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 mb-4 flex items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No scan history yet
            </h3>
            <p className="text-gray-500">
              When users scan your QR code, their activity will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
