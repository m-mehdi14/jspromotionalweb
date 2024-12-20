"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Flyer } from "./types";
import { fetchFlyersByBrand } from "@/actions/admin/brand/flyers/fetch-flyers";
import { saveFlyer } from "@/actions/admin/brand/flyers/save-flyer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlyerList } from "../../admin-flyer/_components/FlyerList";
import { FlyerFormDialog } from "../../admin-flyer/_components/FlyerFormDialog";

const AdminFlyers = ({ brandId }: { brandId: string }) => {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<Flyer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFlyers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchFlyersByBrand(brandId);
      setFlyers(data);
    } catch (error) {
      console.error("Error fetching flyers:", error);
      toast.error("Failed to fetch flyers.");
    } finally {
      setIsLoading(false);
    }
  }, [brandId]);

  const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
    try {
      await saveFlyer(flyerData);
      toast.success(
        editingFlyer
          ? "Flyer updated successfully!"
          : "Flyer created successfully!"
      );
      fetchFlyers();
      setIsDialogOpen(false);
      setEditingFlyer(null);
    } catch (error) {
      console.error("Error saving flyer:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  const handleEditFlyer = (flyer: Flyer) => {
    setEditingFlyer(flyer);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchFlyers();
  }, [fetchFlyers]);

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Flyers for Brand #{brandId}
        </h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            setEditingFlyer(null);
            setIsDialogOpen(true);
          }}
        >
          Add New Flyer
        </Button>
      </header>

      {/* Flyer List */}
      <FlyerList
        flyers={flyers}
        isLoading={isLoading}
        onEdit={handleEditFlyer}
      />

      {/* Add/Edit Flyer Dialog */}
      <FlyerFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveFlyer}
        flyer={editingFlyer}
        brandId={brandId}
      />
    </div>
  );
};

export default AdminFlyers;
