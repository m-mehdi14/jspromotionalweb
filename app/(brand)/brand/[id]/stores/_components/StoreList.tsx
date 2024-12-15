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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <div
          key={store.id}
          className="bg-gray-800 text-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold truncate">{store.name}</h2>
            <p className="text-sm text-gray-400 truncate">{store.email}</p>
          </div>

          <div className="text-gray-300 text-sm mb-4 truncate">
            {store.description || "No description provided."}
          </div>

          {store.image && (
            <Image
              src={store.image}
              alt={store.name}
              className="w-full h-32 object-cover rounded-md mb-4 border border-gray-700"
              height={128}
              width={200}
            />
          )}

          <div className="flex justify-between items-center">
            {/* Edit Button */}
            <Button
              variant="ghost"
              className="text-green-500 hover:text-green-600 flex items-center"
              onClick={() => onEdit(store)}
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>

            {/* Delete Button */}
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-600 flex items-center"
              onClick={() => onDelete(store.id as string, store.name)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
