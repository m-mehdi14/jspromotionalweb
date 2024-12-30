"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchSpecialEvents } from "@/actions/admin/special-events/fetch-special-events";

interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  brandId: string;
  storeId: string;
  startDate: string;
  endDate: string;
  image: string;
}

export const SpecialEventsComponent = () => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Filters
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const response = await fetchSpecialEvents();
        if (response) {
          setEvents(response);
          setFilteredEvents(response);
        }
      } catch (error) {
        console.error("Error fetching special events:", error);
      }
      setLoading(false);
    };

    loadEvents();
  }, []);

  // Filter Logic
  useEffect(() => {
    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, events]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold bg-black p-7 rounded-md  text-white">Special Events</h1>

      {/* Search Bar */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center h-full space-y-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-full h-12" />
          ))}
        </div>
      ) : currentItems.length > 0 ? (
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Store/Brand ID</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell className="font-medium">
                    {event?.name || "N/A"}
                  </TableCell>
                  <TableCell>{event?.description || "N/A"}</TableCell>
                  <TableCell>
                    {event.storeId || event.brandId || "N/A"}
                  </TableCell>
                  <TableCell>
                    {event.startDate
                      ? new Date(event.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {event.endDate
                      ? new Date(event.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={event.image || "https://via.placeholder.com/50"}
                      alt={event.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded"
                    />
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
      ) : (
        <p className="text-center text-gray-500">No special events found.</p>
      )}
    </div>
  );
};
