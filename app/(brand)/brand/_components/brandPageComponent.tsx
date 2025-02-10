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
      <header className="w-full flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Brand Dashboard</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">Welcome, {user?.email || "Admin"}!</p>
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
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
                    {scan?.userId}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {scan?.postalCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(scan?.scannedAt).toLocaleString()}
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
