"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (!categories.length) {
    return <div>No categories found. Add a new category to get started!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-gray-200 p-4 rounded shadow-md">
          <h2 className="text-lg font-bold">{category.name}</h2>
          <p>{category.description}</p>
          {category.createdAt && (
            <p className="text-gray-500 text-sm">
              Created At: {new Date(category.createdAt).toLocaleString()}
            </p>
          )}
          {category.updatedAt && (
            <p className="text-gray-500 text-sm">
              Updated At: {new Date(category.updatedAt).toLocaleString()}
            </p>
          )}
          <div className="flex justify-end mt-4 space-x-2">
            <Button onClick={() => onEdit(category)}>Edit</Button>
            <Button onClick={() => onDelete(category.id)} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
