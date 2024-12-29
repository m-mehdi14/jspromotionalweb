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
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FlyerList = ({
  flyers,
  isLoading,
  onEdit,
  onDelete,
}: {
  flyers: {
    id: string;
    title: string;
    description: string;
    image: string;
    validFrom: string;
    validTo: string;
  }[];
  isLoading: boolean;
  // @ts-expect-error ignore
  onEdit: (flyer) => void;
  onDelete: (flyerId: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(flyers.length / itemsPerPage);
  const paginatedFlyers = flyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(itemsPerPage)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (flyers.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No flyers found. Add a new flyer to get started!
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="rounded-lg border border-gray-200 shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100 text-blue-900">
            <TableHead className="py-4 px-6">Image</TableHead>
            <TableHead className="py-4 px-6">Title</TableHead>
            <TableHead className="py-4 px-6">Description</TableHead>
            <TableHead className="py-4 px-6">Valid From</TableHead>
            <TableHead className="py-4 px-6">Valid To</TableHead>
            <TableHead className="py-4 px-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedFlyers.map((flyer) => (
            <TableRow
              key={flyer.id}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="py-4 px-6">
                {flyer.image ? (
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    width={60}
                    height={60}
                    className="rounded-md shadow-sm"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-700">
                {flyer.title}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-500 truncate max-w-xs">
                {flyer.description || "No description available"}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(flyer.validFrom))}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(flyer.validTo))}
              </TableCell>
              <TableCell className="py-4 px-6 text-right">
                <div className="flex items-center justify-end space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(flyer);
                          }}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Edit className="w-5 h-5 text-blue-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Flyer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(flyer.id);
                          }}
                          className="p-2 hover:bg-red-100"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Flyer</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
