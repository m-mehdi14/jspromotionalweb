"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SpecialEvent } from "./types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SpecialEventList } from "./SpecialEventList";
import { SpecialEventFormDialog } from "./SpecialEventFormDialog";
import { fetchSpecialEvents } from "@/actions/admin/brand/special-events/fetchSpecialEvents";
import { editSpecialEvent } from "@/actions/admin/brand/special-events/editSpecialEvent";
import { saveSpecialEvent } from "@/actions/admin/brand/special-events/saveSpecialEvent";
import { deleteSpecialEvent } from "@/actions/admin/brand/special-events/deleteSpecialEvent";

const AdminSpecialEvents = ({ brandId }: { brandId: string }) => {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SpecialEvent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchSpecialEvents(brandId);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching special events:", error);
      toast.error("Failed to fetch special events.");
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  const handleSaveEvent = async (eventData: Omit<SpecialEvent, "id">) => {
    setIsSubmitting(true);
    try {
      if (editingEvent) {
        const response = await editSpecialEvent(editingEvent.id, {
          ...eventData,
          image: eventData.image ?? undefined,
        });
        if (response.success) {
          toast.success("Special event updated successfully!");
        } else {
          toast.error(response.message);
          return;
        }
      } else {
        await saveSpecialEvent({
          ...eventData,
          brandId,
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          image: eventData.image ?? undefined,
        });
        toast.success("Special event created successfully!");
      }
      await fetchEvents();
      setIsDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error saving special event:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    setIsDeleting(eventId);
    try {
      const response = await deleteSpecialEvent(eventId);
      if (response.success) {
        toast.success("Special event deleted successfully!");
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting special event:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEditEvent = (event: SpecialEvent) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className=" p-8">
      <header className="relative w-full">
        {/* Black Bar Header */}
        <div className="flex justify-between items-center bg-black text-white rounded-md p-6 mb-10">
          <h1 className="text-3xl font-bold">Manage Special Events</h1>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            onClick={() => {
              setEditingEvent(null);
              setIsDialogOpen(true);
            }}
          >
            Add New Event
          </Button>
        </div>
      </header>


      <SpecialEventList
        // @ts-expect-error events props type mismatch sometime
        events={events}
        isLoading={isLoading}
        isDeleting={isDeleting}
        //@ts-expect-error onEdit prop type mismatch
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />

      <SpecialEventFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
        brandId={brandId}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminSpecialEvents;
