import React from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

interface HeaderProps {
  onAddBrand: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddBrand }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Manage Brands</h1>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onAddBrand}
        >
          Add New Brand
        </Button>
      </DialogTrigger>
    </header>
  );
};

export default Header;
