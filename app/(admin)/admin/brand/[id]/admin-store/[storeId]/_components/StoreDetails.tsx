import React from "react";
import Image from "next/image";
import { Store } from "./type";

export const StoreDetails = ({
  store,
  brandId,
}: {
  store: Store;
  brandId: string;
}) => {
  return (
    <div className=" mx-auto  rounded-lg p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Store Details</h1>
        {store.image && (
          <div className="flex-shrink-0 w-20 h-20">
            <Image
              src={store.image}
              alt={store.name}
              width={80}
              height={80}
              className="rounded-lg shadow-md object-cover"
            />
          </div>
        )}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Information */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Information
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <strong className="text-gray-800">Name:</strong> {store.name}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Email:</strong> {store.email}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Postal Code:</strong>{" "}
              {store.postalCode}
            </p>
            <p className="text-gray-600">
              <strong className="text-gray-800">Description:</strong>{" "}
              {store.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Actions Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Manage Flyers
          </h2>
          <p className="text-gray-600 mb-6">
            Access and manage all flyers for this store.
          </p>
          <a
            href={`/admin/brand/${brandId}/admin-store/${store.id}/flyers`}
            className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            View and Manage Flyers
          </a>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Created At</h2>
        <p className="text-gray-600">
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(
            new Date(
              // @ts-expect-error ignore
              store.createdAt
            )
          )}
        </p>
      </div>
    </div>
  );
};
