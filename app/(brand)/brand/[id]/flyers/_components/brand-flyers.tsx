"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchBrandFlyers } from "@/actions/brand/flyers/fetch-flyers";
import { saveFlyer } from "@/actions/brand/flyers/save-flyers";
import { editFlyer } from "@/actions/brand/flyers/edit-flyers";
import { deleteFlyer } from "@/actions/brand/flyers/delete-flyers";
import { FlyerList } from "./FlyerList";
import { FlyerFormDialog } from "./FlyerFormDialog";
import { Button } from "@/components/ui/button";

interface BrandFlyersProps {
  brandId: string;
}

const BrandFlyers = ({ brandId }: BrandFlyersProps) => {
  const [flyers, setFlyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFlyers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchBrandFlyers(brandId);
      setFlyers(data);
    } catch (error) {
      console.error("Error fetching flyers:", error);
      toast.error("Failed to fetch flyers.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveFlyer = async (flyerData) => {
    setIsSubmitting(true);
    try {
      if (editingFlyer) {
        await editFlyer(editingFlyer.id, flyerData);
        toast.success("Flyer updated successfully!");
      } else {
        await saveFlyer(flyerData);
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
    fetchFlyers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Flyers</h1>
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
      />
    </div>
  );
};

export default BrandFlyers;
