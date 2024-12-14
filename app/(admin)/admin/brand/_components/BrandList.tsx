import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { Brand } from "./types";

interface BrandListProps {
  brands: Brand[];
  loading: boolean;
  onEdit: (brand: Brand) => void;
  onDelete: (id: string, name: string) => void;
}

const BrandList: React.FC<BrandListProps> = ({
  brands,
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <div className="text-center text-lg">Loading brands...</div>;
  }

  return brands.length === 0 ? (
    <div className="text-center mt-8">
      <p className="text-2xl font-bold text-gray-300">No Brands Found</p>
      <p className="text-gray-400 mt-2">Add new brands to manage them here.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <Card
          key={brand.id}
          className="bg-gray-800 text-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
        >
          <CardHeader>
            <CardTitle>{brand.name}</CardTitle>
            <p>{brand.email}</p>
          </CardHeader>
          <CardContent>
            <p>{brand.description}</p>
            <div className="flex justify-between mt-4">
              <Button variant="ghost" onClick={() => onEdit(brand)}>
                <Edit className="w-4 h-4 mr-2" /> Edit
              </Button>
              <Button
                variant="ghost"
                onClick={() => onDelete(brand.id, brand.name)}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BrandList;
