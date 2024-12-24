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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">{store.name}</h2>
      <p>
        <strong>Email:</strong> {store.email}
      </p>
      <p>
        <strong>Postal Code:</strong> {store.postalCode}
      </p>
      <p>
        <strong>Description:</strong> {store.description}
      </p>
      <Image
        src={store.image}
        alt={store.name}
        width={128} // Adjust the width as needed
        height={128} // Adjust the height as needed
        className="w-32 h-auto mt-4 rounded-md"
      />

      {/* Add specific logic here */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Manage Flyers</h3>
        {/* Link to manage flyers for this store */}
        <a
          href={`/admin/brand/${brandId}/admin-store/${store.id}/flyers`}
          className="text-blue-500 hover:underline"
        >
          View and Manage Flyers
        </a>
      </div>
    </div>
  );
};
