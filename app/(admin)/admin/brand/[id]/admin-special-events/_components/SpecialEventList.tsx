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
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";

export interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  image?: string;
  startDate: string;
  endDate: string;
}

export const SpecialEventList = ({
  events,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: {
  events: SpecialEvent[];
  isLoading: boolean;
  isDeleting: string | null;
  onEdit: (event: SpecialEvent) => void;
  onDelete: (eventId: string) => void;
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-12 rounded-md" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-gray-300">No Events Found</p>
        <p className="text-gray-400 mt-2">Add a new event to get started!</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Table className=" rounded-lg shadow">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="text-left">Image</TableHead>
            <TableHead className="text-left">Name</TableHead>
            <TableHead className="text-left">Description</TableHead>
            <TableHead className="text-left">Start Date</TableHead>
            <TableHead className="text-left">End Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="hover:bg-gray-50">
              <TableCell className="w-24">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>
              <TableCell className="font-medium text-gray-800">
                {event.name}
              </TableCell>
              <TableCell className="text-gray-600 line-clamp-2">
                {event.description || "No description available"}
              </TableCell>
              {/* <TableCell className="text-gray-700">{event.startDate}</TableCell>
              <TableCell className="text-gray-700">{event.endDate}</TableCell> */}
              <TableCell className="text-gray-700">
                {new Date(event.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="text-gray-700">
                {new Date(event.endDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  className="text-blue-500 hover:bg-blue-100"
                  onClick={() => onEdit(event)}
                >
                  <Pencil className="w-4 h-4" />
                  {/* Edit */}
                </Button>
                <Button
                  variant="destructive"
                  className=" hover:bg-red-200"
                  onClick={() => onDelete(event.id)}
                  disabled={isDeleting === event.id}
                >
                  {/* <Trash className="w-4 h-4" /> */}
                  <Trash
                    className={` w-4 h-4 ${
                      isDeleting === event.id &&
                      " disabled:opacity-0 disabled:cursor-not-allowed"
                    }`}
                  />
                  {/* {isDeleting === event.id ? "Deleting..." : "Delete"} */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
