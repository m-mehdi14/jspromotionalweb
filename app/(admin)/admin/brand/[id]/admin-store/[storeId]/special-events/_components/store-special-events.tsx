"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SpecialEventList } from "./SpecialEventList";
import { SpecialEventFormDialog } from "./SpecialEventFormDialog";
import { fetchSpecialEventsByStore } from "@/actions/admin/brand/specific-store/special-events/Fetch-Events";
import { editSpecialEvent } from "@/actions/admin/brand/specific-store/special-events/edit-events";
import { saveSpecialEvent } from "@/actions/admin/brand/specific-store/special-events/save-events";
import { deleteSpecialEvent } from "@/actions/admin/brand/specific-store/special-events/delete-events";

interface AdminStoreSpecialEventsProps {
  brandId: string;
  storeId: string;
}

const AdminStoreSpecialEvents = ({
  brandId,
  storeId,
}: AdminStoreSpecialEventsProps) => {
  const [specialEvents, setSpecialEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSpecialEvents = async () => {
    setIsLoading(true);
    try {
      const data = await fetchSpecialEventsByStore(brandId, storeId);
      setSpecialEvents(data);
    } catch (error) {
      console.error("Error fetching special events:", error);
      toast.error("Failed to fetch special events.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSpecialEvent = async (eventData) => {
    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await editSpecialEvent(editingEvent.id, eventData);
        toast.success("Special event updated successfully!");
      } else {
        await saveSpecialEvent({ ...eventData, brandId, storeId });
        toast.success("Special event created successfully!");
      }
      await fetchSpecialEvents();
      setIsDialogOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error("Error saving special event:", error);
      toast.error("Failed to save special event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSpecialEvent = async (eventId) => {
    try {
      await deleteSpecialEvent(eventId);
      toast.success("Special event deleted successfully!");
      await fetchSpecialEvents();
    } catch (error) {
      console.error("Error deleting special event:", error);
      toast.error("Failed to delete special event.");
    }
  };

  useEffect(() => {
    if (brandId && storeId) {
      fetchSpecialEvents();
    }
  }, [brandId, storeId]);

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

      {/* Special Event List */}
      <SpecialEventList
        events={specialEvents}
        isLoading={isLoading}
        onEdit={(event) => {
          setEditingEvent(event);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteSpecialEvent}
      />

      {/* Add/Edit Event Dialog */}
      <SpecialEventFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveSpecialEvent}
        event={editingEvent}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminStoreSpecialEvents;
