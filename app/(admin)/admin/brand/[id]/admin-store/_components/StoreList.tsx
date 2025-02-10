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
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

interface Store {
  id: string;
  name: string;
  description: string;
  email: string;
  image?: string;
  postalCode: string;
  type: string;
  createdAt: string;
}

const StoreList = ({
  stores = [],
  loading,
  onEdit,
  onDelete,
  brandId,
}: {
  stores?: Store[];
  loading: boolean;
  onEdit: (store: Store) => void;
  onDelete: (id: string, name: string) => void;
  brandId: string;
}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Paginate stores
  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const paginatedStores = stores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(itemsPerPage)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (stores.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No stores found. Add a new store to get started!
      </div>
    );
  }

  return (
    <div className="w-full p-4  rounded-lg">
      <Table className="rounded-lg">
        <TableHeader>
          <TableRow className=" text-gray-700">
            <TableHead className="py-4">Logo</TableHead>
            <TableHead className="py-4">Store Name</TableHead>
            <TableHead className="py-4">Description</TableHead>
            <TableHead className="py-4">Email</TableHead>
            <TableHead className="py-4">Postal Code</TableHead>
            <TableHead className="py-4">Type</TableHead>
            <TableHead className="py-4">Created At</TableHead>
            <TableHead className="py-4 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStores.map((store) => (
            <TableRow
              key={store.id}
              className="hover:bg-gray-50 transition duration-200"
            >
              <TableCell className="text-center">
                {store.image ? (
                  <Image
                    src={store.image}
                    alt={store.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-full mx-auto"></div>
                )}
              </TableCell>
              <TableCell className="text-gray-800 font-medium">
                {store.name}
              </TableCell>
              <TableCell className="text-gray-600">
                {store.description || "No description available"}
              </TableCell>
              <TableCell className="text-gray-600">{store.email}</TableCell>
              <TableCell className="text-gray-600">
                {store.postalCode}
              </TableCell>
              <TableCell className="text-gray-600">{store.type}</TableCell>
              <TableCell className="text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(store.createdAt))}
              </TableCell>
              <TableCell className="flex justify-center items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(store);
                  }}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(store.id, store.name);
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <ArrowRight
                        className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-700"
                        onClick={() =>
                          router.push(
                            `/admin/brand/${brandId}/admin-store/${store.id}`
                          )
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Go to store details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Section */}
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

export default StoreList;
