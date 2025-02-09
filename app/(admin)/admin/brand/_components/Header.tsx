import React from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface HeaderProps {
  onAddBrand: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddBrand }) => {
  return (
    <header className="relative w-full">
      <div className="flex justify-between items-center bg-black text-white rounded-md p-6">
        <h1 className="text-3xl font-bold">Manage Brands</h1>
        <DialogTrigger asChild>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={onAddBrand}
          >
            Add New Brand
          </Button>
        </DialogTrigger>
      </div>
    </header>

  );
};

export default Header;
