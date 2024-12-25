"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FlyerList } from "./FlyerList";
import { FlyerFormDialog } from "./FlyerFormDialog";
import { fetchFlyersByStore } from "@/actions/store/flyers/fetch-flyers";
import { editFlyer } from "@/actions/store/flyers/edit-flyers";
import { saveFlyer } from "@/actions/store/flyers/save-flyers";
import { deleteFlyer } from "@/actions/store/flyers/delete-flyers";

const StoreFlyers = () => {
  const { user } = useAuth();
  const storeId = user?.uid; // Fetch the store ID from `useAuth`
  const [flyers, setFlyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFlyers = async () => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchFlyersByStore(storeId);
      setFlyers(data);
    } catch (error) {
      console.error("Error fetching flyers:", error);
      toast.error("Failed to fetch flyers.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFlyer = async (flyerData) => {
    if (!storeId) {
      toast.error("Store ID is missing.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingFlyer) {
        await editFlyer(editingFlyer.id, flyerData);
        toast.success("Flyer updated successfully!");
      } else {
        await saveFlyer({ ...flyerData, storeId });
        toast.success("Flyer created successfully!");
      }
      await fetchFlyers();
      setIsDialogOpen(false);
      setEditingFlyer(null);
    } catch (error) {
      console.error("Error saving flyer:", error);
      toast.error("Failed to save flyer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFlyer = async (flyerId) => {
    try {
      await deleteFlyer(flyerId);
      toast.success("Flyer deleted successfully!");
      await fetchFlyers();
    } catch (error) {
      console.error("Error deleting flyer:", error);
      toast.error("Failed to delete flyer.");
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchFlyers();
    }
  }, [storeId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Flyers for Store #{storeId}
        </h1>
        <Button
          className="bg-blue-600 text-white"
          onClick={() => {
            setIsDialogOpen(true);
            setEditingFlyer(null);
          }}
        >
          Add New Flyer
        </Button>
      </header>

      {/* Flyer List */}
      <FlyerList
        flyers={flyers}
        isLoading={isLoading}
        onEdit={(flyer) => {
          setEditingFlyer(flyer);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteFlyer}
      />

      {/* Add/Edit Flyer Dialog */}
      <FlyerFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveFlyer}
        flyer={editingFlyer}
        isSubmitting={isSubmitting}
        storeId={storeId}
      />
    </div>
  );
};

export default StoreFlyers;
