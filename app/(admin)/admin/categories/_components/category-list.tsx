"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react"; // Vector icons

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  // Pagination Logic
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-600">Loading categories...</div>
    );
  }

  if (!categories.length) {
    return (
      <div className="text-center text-gray-400">
        No categories found. Add a new category to get started!
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <Table className="rounded-md shadow-md border border-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="font-bold">Name</TableHead>
            <TableHead className="font-bold">Created At</TableHead>
            <TableHead className="font-bold">Updated At</TableHead>
            <TableHead className="font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((category) => (
            <TableRow key={category.id} className="hover:bg-gray-50">
              <TableCell>{category.name}</TableCell>
              <TableCell>
                {category.createdAt
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(category.createdAt))
                  : "N/A"}
              </TableCell>
              <TableCell>
                {category.updatedAt
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(category.updatedAt))
                  : "N/A"}
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => onEdit(category)}
                  className="text-blue-500 flex items-center space-x-1"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onDelete(category.id)}
                  className="text-red-500 flex items-center space-x-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
