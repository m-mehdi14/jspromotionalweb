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

export const SpecialEventList = ({
  events,
  isLoading,
  onEdit,
  onDelete,
}: {
  events: {
    id: string;
    name: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
  }[];
  isLoading: boolean;
  // @ts-expect-error ignore
  onEdit: (event) => void;
  onDelete: (eventId: string) => void;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(events.length / itemsPerPage);
  const paginatedEvents = events.slice(
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

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No special events found. Add a new event to get started!
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="rounded-lg border border-gray-200 shadow-md">
        <TableHeader>
          <TableRow className="bg-gray-100 text-blue-900">
            <TableHead className="py-4 px-6">Image</TableHead>
            <TableHead className="py-4 px-6">Name</TableHead>
            <TableHead className="py-4 px-6">Description</TableHead>
            <TableHead className="py-4 px-6">Start Date</TableHead>
            <TableHead className="py-4 px-6">End Date</TableHead>
            <TableHead className="py-4 px-6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEvents.map((event) => (
            <TableRow
              key={event.id}
              className="hover:bg-gray-50 transition duration-300"
            >
              <TableCell className="py-4 px-6">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.name}
                    width={60}
                    height={60}
                    className="rounded-md shadow-sm"
                  />
                ) : (
                  <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                )}
              </TableCell>
              <TableCell className="py-4 px-6 font-medium text-gray-700">
                {event.name}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-500 truncate max-w-xs">
                {event.description || "No description available"}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(event.startDate))}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(event.endDate))}
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
                            onEdit(event);
                          }}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Edit className="w-5 h-5 text-blue-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Event</p>
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
                            onDelete(event.id);
                          }}
                          className="p-2 hover:bg-red-100"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Event</p>
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
