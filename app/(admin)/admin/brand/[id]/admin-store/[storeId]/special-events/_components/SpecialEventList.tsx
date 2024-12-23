"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export const SpecialEventList = ({ events, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <div className="text-center">Loading special events...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No special events found. Add a new event to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <p>{event.description}</p>
          {event.image && (
            <img
              src={event.image}
              alt={event.name}
              className="mt-4 w-full rounded-md"
            />
          )}
          <p>
            <strong>Start Date:</strong> {event.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {event.endDate}
          </p>
          <div className="flex justify-end mt-4">
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
