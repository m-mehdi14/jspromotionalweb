import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddStore: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddStore }) => {
  return (
    <header className="flex justify-between items-center mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-md shadow-lg">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white">Brand Stores</h1>

      {/* Add Store Button */}
      <Button
        onClick={onAddStore}
        className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 font-semibold rounded shadow-sm"
      >
        Add New Store
      </Button>
    </header>
  );
};

export default Header;
