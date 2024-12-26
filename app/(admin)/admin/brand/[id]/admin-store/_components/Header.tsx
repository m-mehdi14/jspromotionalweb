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
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Manage Stores for Brand</h1>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={onAddStore}
      >
        Add New Store
      </Button>
    </header>
  );
};

export default Header;
