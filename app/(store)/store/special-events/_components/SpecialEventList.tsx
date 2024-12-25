"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  image?: string;
  startDate: string;
  endDate: string;
}

interface SpecialEventListProps {
  events: SpecialEvent[];
  isLoading: boolean;
  onEdit: (event: SpecialEvent) => void;
  onDelete: (id: string) => void;
}

export const SpecialEventList: React.FC<SpecialEventListProps> = ({
  events,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (events.length === 0) {
    return <div className="text-center text-gray-400">No events found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <p>{event.description}</p>
          <Image
            src={event.image || "https://via.placeholder.com/128"}
            alt={event.name}
            width={500}
            height={300}
            className="w-full rounded-md mt-4"
          />
          <p>
            <strong>Start Date:</strong> {event.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {event.endDate}
          </p>
          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="secondary" onClick={() => onEdit(event)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(event.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
