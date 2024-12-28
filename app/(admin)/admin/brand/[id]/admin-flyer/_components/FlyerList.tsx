"use client";

import React from "react";
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
import { Pencil, Trash } from "lucide-react";
import { Flyer } from "../../admin-store/_components/types";

export const FlyerList = ({
  flyers,
  isLoading,
  onEdit,
  onDelete,
  isDeleting,
}: {
  flyers: Flyer[];
  isLoading: boolean;
  onEdit: (flyer: Flyer) => void;
  onDelete: (flyerId: string) => void;
  isDeleting: string;
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full h-12 bg-gray-200 rounded-md animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (flyers.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-gray-300">No Flyers Found</p>
        <p className="text-gray-400 mt-2">Add a new flyer to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table className=" rounded-lg shadow-2xl p-2">
        <TableHeader className=" bg-white">
          <TableRow>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-left">Description</TableHead>
            <TableHead className="text-left">Valid From</TableHead>
            <TableHead className="text-left">Valid To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flyers.map((flyer) => (
            <TableRow key={flyer.id} className="  bg-white">
              <TableCell className="w-24">
                {flyer.image ? (
                  <Image
                    src={flyer.image}
                    alt={flyer.title}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>
              <TableCell className="font-medium text-gray-800">
                {flyer.title}
              </TableCell>
              <TableCell className="text-gray-600 line-clamp-2">
                {flyer.description || "No description available"}
              </TableCell>
              <TableCell className="text-gray-700">{flyer.validFrom}</TableCell>
              <TableCell className="text-gray-700">{flyer.validTo}</TableCell>
              <TableCell className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  className="text-blue-500 hover:bg-blue-100"
                  onClick={() => onEdit(flyer)}
                >
                  <Pencil className="w-4 h-4" />
                  {/* Edit */}
                </Button>
                <Button
                  variant="destructive"
                  className=" text-white hover:bg-opacity-65"
                  onClick={() => onDelete(flyer.id)}
                  disabled={isDeleting === flyer.id}
                >
                  <Trash
                    className={` w-4 h-4 ${
                      isDeleting === flyer.id && " disabled:cursor-wait"
                    }`}
                  />
                  {/* {isDeleting === flyer.id ? "Deleting..." : "Delete"} */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
