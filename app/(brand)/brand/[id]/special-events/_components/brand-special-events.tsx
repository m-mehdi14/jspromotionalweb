"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchSpecialEventsByBrand } from "@/actions/brand/special-events/fetch-events";
import { saveSpecialEvent } from "@/actions/brand/special-events/save-events";
import { editSpecialEvent } from "@/actions/brand/special-events/edit-events";
import { deleteSpecialEvent } from "@/actions/brand/special-events/delete-events";
import { SpecialEventList } from "./SpecialEventList";
import { SpecialEventFormDialog } from "./SpecialEventFormDialog";
import { Button } from "@/components/ui/button";

const BrandSpecialEvents = ({ brandId }: { brandId: string }) => {
  const [events, setEvents] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SpecialEvent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSpecialEventsByBrand(brandId);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  interface SpecialEvent {
    id: string;
    // Add other properties of SpecialEvent as needed
  }

  // @ts-expect-error ignore
  const handleSaveEvent = async (eventData) => {
    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await editSpecialEvent(editingEvent.id, eventData);
        toast.success("Event updated successfully!");
      } else {
        await saveSpecialEvent({ ...eventData, brandId });
        toast.success("Event created successfully!");
      }
      await fetchEvents();
      setIsDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteSpecialEvent(eventId);
      toast.success("Event deleted successfully!");
      await fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [brandId, fetchEvents]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Special Events</h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            setIsDialogOpen(true);
            setEditingEvent(null);
          }}
        >
          Add New Event
        </Button>
      </header>

      {/* Event List */}
      <SpecialEventList
        // @ts-expect-error ignore
        events={events}
        isLoading={isLoading}
        onEdit={(event) => {
          setEditingEvent(event);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteEvent}
      />

      {/* Add/Edit Event Dialog */}
      <SpecialEventFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEvent}
        // @ts-expect-error ignore
        event={editingEvent}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BrandSpecialEvents;
