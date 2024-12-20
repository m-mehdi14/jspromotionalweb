"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { saveFlyer } from "@/actions/admin/brand/flyers/save-flyer";
import { Flyer } from "./types";
import { fetchFlyersByBrand } from "@/actions/admin/brand/flyers/fetch-flyers";

const AdminFlyers = ({ brandId }: { brandId: string }) => {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<Flyer | null>(null);

  const fetchFlyers = useCallback(async () => {
    try {
      const data = await fetchFlyersByBrand(brandId);
      setFlyers(data);
    } catch (error) {
      console.error("Error fetching flyers:", error);
      toast.error("Failed to fetch flyers.");
    }
  }, [brandId]);

  const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
    try {
      const response = await saveFlyer({ ...flyerData, brandId });
      toast.success("Flyer saved successfully!");
      fetchFlyers();
      setIsDialogOpen(false);
      setEditingFlyer(null);
    } catch (error) {
      console.error("Error saving flyer:", error);
      toast.error("An unexpected error occurred while saving the flyer.");
    }
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
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingFlyer(null);
            setIsDialogOpen(true);
          }}
        >
          Add New Flyer
        </button>
      </header>

      {/* Flyer List */}
      <div>
        {flyers.length === 0 ? (
          <p>No flyers found. Add a new flyer to get started!</p>
        ) : (
          flyers.map((flyer) => (
            <div key={flyer.id} className="mb-4 p-4 bg-gray-800 rounded">
              <h2 className="text-xl font-bold">{flyer.title}</h2>
              <p>{flyer.description}</p>
              <button
                className="text-blue-400 mt-2"
                onClick={() => setEditingFlyer(flyer)}
              >
                Edit
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Flyer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>
            {editingFlyer ? "Edit Flyer" : "Add New Flyer"}
          </DialogTitle>
          {/* Add Flyer Form Here */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFlyers;
