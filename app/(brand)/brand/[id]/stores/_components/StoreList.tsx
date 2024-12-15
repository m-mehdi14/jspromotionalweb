import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const StoreList = ({
  stores,
  loading,
}: {
  stores: any[];
  loading: boolean;
}) => {
  if (loading) {
    return <div className="text-center text-lg">Loading stores...</div>;
  }

  if (stores.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-gray-300">No Stores Found</p>
        <p className="text-gray-400 mt-2">
          Add new stores to manage them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stores.map((store) => (
        <Card
          key={store.id}
          className="bg-gray-800 text-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
        >
          <CardHeader>
            <CardTitle>{store.name}</CardTitle>
            <p className="text-sm text-gray-400">{store.email}</p>
          </CardHeader>
          <CardContent>
            <p>{store.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StoreList;
