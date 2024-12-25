"use client";

import React, { useCallback, useEffect, useState } from "react";
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
  const [flyers, setFlyers] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<{ id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFlyers = useCallback(async () => {
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
  }, [brandId]);

  interface FlyerData {
    title: string;
    description: string;
    imageUrl: string;
    validFrom: string;
    validTo: string;
    brandId: string;
  }

  const handleSaveFlyer = async (flyerData: FlyerData) => {
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

  const handleDeleteFlyer = async (flyerId: string) => {
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
  }, [fetchFlyers]);

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
        // @ts-expect-error ignore
        flyers={flyers}
        isLoading={isLoading}
        // @ts-expect-error ignore
        onEdit={(flyer: FlyerData) => {
          // @ts-expect-error ignore
          setEditingFlyer(flyer);
          setIsDialogOpen(true);
        }}
        onDelete={handleDeleteFlyer}
      />

      {/* Add/Edit Flyer Dialog */}
      <FlyerFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        // @ts-expect-error ignore
        onSave={handleSaveFlyer}
        // @ts-expect-error ignore
        flyer={editingFlyer}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BrandFlyers;
