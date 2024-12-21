import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    return <div className="text-center">Loading events...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No events found. Add a new event to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-600 rounded-lg p-4 shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-bold mb-2 text-neutral-200">
            {event.name}
          </h2>
          <p className="text-sm text-gray-400">{event.description}</p>
          <p className="text-sm text-gray-400">
            {event.startDate} - {event.endDate}
          </p>
          {event.image && (
            <div className="relative w-full h-48 mt-4 rounded-md overflow-hidden">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <Button variant="secondary" onClick={() => onEdit(event)}>
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => onDelete(event.id)}
              disabled={isDeleting === event.id}
            >
              {isDeleting === event.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
