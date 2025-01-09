"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Flyer } from "./types";
import { fetchFlyersByBrand } from "@/actions/admin/brand/flyers/fetch-flyers";
import { saveFlyer } from "@/actions/admin/brand/flyers/save-flyer";
import { editFlyer } from "@/actions/admin/brand/flyers/edit-flyers";
import { deleteFlyer } from "@/actions/admin/brand/flyers/delete-flyer";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FlyerList } from "../../admin-flyer/_components/FlyerList";
import { FlyerFormDialog } from "../../admin-flyer/_components/FlyerFormDialog";
import { getFavoritesFromFirebase } from "@/actions/get-favourites";
import { sendNotification } from "@/actions/send-notifications";

const AdminFlyers = ({ brandId }: { brandId: string }) => {
  const [flyers, setFlyers] = useState<Flyer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<Flyer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track deletion status

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

  // const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (editingFlyer) {
  //       // If editing, call editFlyer
  //       const response = await editFlyer(editingFlyer.id, flyerData);
  //       if (response.success) {
  //         toast.success("Flyer updated successfully!");
  //       } else {
  //         toast.error(response.message);
  //         return;
  //       }
  //     } else {
  //       // If creating, call saveFlyer
  //       await saveFlyer(flyerData);
  //       toast.success("Flyer created successfully!");
  //     }

  //     await fetchFlyers(); // Fetch latest data
  //     setIsDialogOpen(false); // Close dialog
  //     setEditingFlyer(null); // Reset editing flyer
  //   } catch (error) {
  //     console.error("Error saving flyer:", error);
  //     toast.error("An unexpected error occurred.");
  //   } finally {
  //     setIsSubmitting(false); // Reset submitting state
  //   }
  // };

  const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
    setIsSubmitting(true);

    try {
      let isEdit = false;
      let response;

      if (editingFlyer) {
        // If editing, call editFlyer
        response = await editFlyer(editingFlyer.id, flyerData);
        isEdit = true;
      } else {
        // If creating, call saveFlyer
        response = await saveFlyer(flyerData);
      }

      if (response?.success) {
        toast.success(
          isEdit ? "Flyer updated successfully!" : "Flyer created successfully!"
        );
      } else {
        toast.error(response?.message || "Failed to save flyer.");
        return;
      }

      // Fetch all favorites to get FCM tokens
      const favorites = await getFavoritesFromFirebase();

      // Extract FCM tokens
      // const fcmTokens = favorites
      //   // @ts-expect-error ignore
      //   .map((fav) => fav.fcmToken)
      //   .filter((token) => token);
      // Extract unique FCM tokens
      const fcmTokens = [
        ...new Set(
          favorites
            // @ts-expect-error ignore
            .map((fav) => fav.fcmToken)
            .filter((token) => token) // Remove falsy values (e.g., null, undefined)
        ),
      ];

      if (fcmTokens.length > 0) {
        // Prepare and send notifications
        const notificationTitle = editingFlyer
          ? `Flyer Updated: ${flyerData.title}`
          : `New Flyer: ${flyerData.title}`;
        const notificationBody = editingFlyer
          ? `The flyer "${flyerData.title}" has been updated. Check out the latest details!`
          : `A new flyer "${flyerData.title}" is now available. Don't miss out on our latest offers!`;

        await sendNotification(fcmTokens, notificationTitle, notificationBody);
        console.log("Notifications sent successfully.");
      } else {
        console.log("No FCM tokens found to send notifications.");
      }

      // Fetch latest flyers and reset state
      await fetchFlyers();
      setIsDialogOpen(false); // Close dialog
      setEditingFlyer(null); // Reset editing flyer
    } catch (error) {
      console.error("Error in handleSaveFlyer:", error);
      toast.error("An unexpected error occurred while saving the flyer.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleDeleteFlyer = async (flyerId: string) => {
    setIsDeleting(flyerId); // Indicate that the flyer is being deleted
    try {
      const response = await deleteFlyer(flyerId);
      if (response.success) {
        toast.success("Flyer deleted successfully!");
        setFlyers((prev) => prev.filter((flyer) => flyer.id !== flyerId)); // Update UI
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting flyer:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(null); // Reset deleting state
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
        <h1 className="text-3xl font-bold">Manage Flyers for Brand</h1>
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
        isDeleting={isDeleting as string} // Pass deleting state as boolean
        onEdit={handleEditFlyer}
        onDelete={handleDeleteFlyer} // Pass delete handler
      />

      {/* Add/Edit Flyer Dialog */}
      <FlyerFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveFlyer}
        flyer={editingFlyer}
        brandId={brandId}
        isSubmitting={isSubmitting} // Pass submitting state to dialog
      />
    </div>
  );
};

export default AdminFlyers;
