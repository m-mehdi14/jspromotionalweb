"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { SpecialEventList } from "./SpecialEventList";
import { SpecialEventFormDialog } from "./SpecialEventFormDialog";
import { fetchSpecialEventsByStore } from "@/actions/store/special-events/fetch-events";
import { editSpecialEvent } from "@/actions/store/special-events/edit-events";
import { saveSpecialEvent } from "@/actions/store/special-events/save-events";
import { deleteSpecialEvent } from "@/actions/store/special-events/delete-events";

const StoreSpecialEvents = () => {
  const { user } = useAuth();
  const storeId = user?.uid; // Fetch the store ID from `useAuth`
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchEvents = async () => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchSpecialEventsByStore(storeId);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEvent = async (eventData) => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await editSpecialEvent(editingEvent.id, eventData);
        toast.success("Event updated successfully!");
      } else {
        await saveSpecialEvent({ ...eventData, storeId });
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

  const handleDeleteEvent = async (eventId) => {
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
    if (storeId) {
      fetchEvents();
    }
  }, [storeId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Special Events for Store #{storeId}
        </h1>
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
        event={editingEvent}
        isSubmitting={isSubmitting}
        storeId={storeId}
      />
    </div>
  );
};

export default StoreSpecialEvents;
