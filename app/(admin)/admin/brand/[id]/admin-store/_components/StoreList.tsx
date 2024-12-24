"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const StoreList = ({
  stores,
  loading,
  onEdit,
  onDelete,
  brandId,
}: {
  stores: { id: string; name: string; description: string }[];
  loading: boolean;
  onEdit: (store: { id: string; name: string; description: string }) => void;
  onDelete: (id: string, name: string) => void;
  brandId: string;
}) => {
  const router = useRouter();
  if (loading) {
    return <div>Loading stores...</div>;
  }

  if (stores.length === 0) {
    return <div>No stores found. Add a new store to get started!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stores.map((store) => (
        <Card
          key={store.id}
          className="bg-gray-800 text-gray-200 shadow-lg transform hover:scale-105"
        >
          <CardHeader>
            <CardTitle
              onClick={() => {
                router.push(`/admin/brand/${brandId}/admin-store/${store.id}`);
              }}
              className=" hover:cursor-pointer transition-all ease-in-out duration-300"
            >
              {store.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{store.description}</p>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={() => onEdit(store)}>
                <Edit className="w-4 h-4" /> Edit
              </Button>
              <Button
                variant="ghost"
                className="text-red-500"
                onClick={() => onDelete(store.id, store.name)}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoreList;
