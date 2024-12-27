import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Store } from "./types";
import Image from "next/image";

interface StoreListProps {
  stores: Store[];
  loading: boolean;
  onEdit: (store: Store) => void;
  onDelete: (id: string, name: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({
  stores,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="text-center text-gray-300">
        <p className="text-lg font-semibold">Loading stores...</p>
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-400">
        <p className="text-2xl font-bold">No Stores Found</p>
        <p>Add new stores to manage them here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Email</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Image</th>
            <th className="px-4 py-2 text-center text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store, index) => (
            <tr
              key={store.id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="px-4 py-2 text-black">{store.name}</td>
              <td className="px-4 py-2 text-black">{store.email}</td>
              <td className="px-4 py-2 text-black truncate max-w-xs">
                {store.description || "No description provided."}
              </td>
              <td className="px-4 py-2">
                {store.image ? (
                  <Image
                    src={store.image}
                    alt={store.name}
                    className="w-16 h-16 object-cover rounded"
                    height={64}
                    width={64}
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Button
                  variant="ghost"
                  className="text-black bg-red-500 hover:text-green-600 flex items-center"
                  onClick={() => onEdit(store)}
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="ghost"
                  className="text-black bg-green-500 hover:text-red-600 flex items-center"
                  onClick={() => onDelete(store.id as string, store.name)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;
