"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Brand {
  id: string;
  name: string;
  email: string;
  description: string;
  image: string | null;
}

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
  const router = useRouter();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-gray-300">No Brands Found</p>
        <p className="text-gray-400 mt-2">
          Add new brands to manage them here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell className="w-20">
                {brand.image ? (
                  <Image
                    src={brand.image}
                    alt={`${brand.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                )}
              </TableCell>
              <TableCell>{brand.name}</TableCell>
              <TableCell>{brand.email}</TableCell>
              <TableCell>
                {brand.description || "No description available"}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(brand);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(brand.id, brand.name);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/admin/brand/${brand.id}/admin-store`);
                        }}
                      >
                        <ArrowRight className="w-4 h-4 text-blue-500 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Go to brand details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BrandList;
