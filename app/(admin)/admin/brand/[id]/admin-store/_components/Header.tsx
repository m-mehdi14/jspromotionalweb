import React from "react";
import { Button } from "@/components/ui/button";

const Header = ({
  brandId,
  onAddStore,
}: {
  brandId: string;
  onAddStore: () => void;
}) => {
  console.log("🚀", brandId);

  return (
    <header className="relative w-full">
      {/* Black Bar Header */}
      <div className="flex justify-between items-center bg-black text-white rounded-md p-6 mb-10">
        <h1 className="text-3xl font-bold">Manage Stores for Brand</h1>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          onClick={onAddStore}
        >
          Add New Store
        </Button>
      </div>
    </header>
  );
};

export default Header;
