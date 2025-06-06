"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import { FlyerList } from "./FlyerList";
import { FlyerFormDialog } from "./FlyerFormDialog";
import { fetchFlyersByStore } from "@/actions/store/flyers/fetch-flyers";
import { editFlyer } from "@/actions/store/flyers/edit-flyers";
import { saveFlyer } from "@/actions/store/flyers/save-flyers";
import { deleteFlyer } from "@/actions/store/flyers/delete-flyers";
import { getFavoritesFromFirebase } from "@/actions/get-favourites";
import { sendNotification } from "@/actions/send-notifications";

const StoreFlyers = () => {
  const { user } = useAuth();
  const storeId = user?.uid; // Fetch the store ID from `useAuth`
  const [flyers, setFlyers] = useState<{ id: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState<{ id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFlyers = useCallback(async () => {
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
  }, [storeId]);

  // @ts-expect-error ignore
  // const handleSaveFlyer = async (flyerData: FlyerData) => {
  //   if (!storeId) {
  //     toast.error("Store ID is missing.");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     if (editingFlyer) {
  //       await editFlyer(editingFlyer.id, flyerData);
  //       toast.success("Flyer updated successfully!");
  //     } else {
  //       await saveFlyer({ ...flyerData, storeId });
  //       toast.success("Flyer created successfully!");
  //     }
  //     await fetchFlyers();
  //     setIsDialogOpen(false);
  //     setEditingFlyer(null);
  //   } catch (error) {
  //     console.error("Error saving flyer:", error);
  //     toast.error("Failed to save flyer.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSaveFlyer = async (flyerData: FlyerData) => {
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
  }, [storeId, fetchFlyers]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="relative w-full">
        {/* Black Bar Header */}
        <div className="flex justify-between items-center bg-black text-white rounded-md p-6 mb-10">
          <h1 className="text-3xl font-bold">Manage Flyers for Store</h1>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            onClick={() => {
              setIsDialogOpen(true);
              setEditingFlyer(null);
            }}
          >
            Add New Flyer
          </Button>
        </div>
      </header>


      {/* Flyer List */}
      <FlyerList
        // @ts-expect-error ignore
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
        // @ts-expect-error ignore
        flyer={editingFlyer}
        isSubmitting={isSubmitting}
        // @ts-expect-error ignore
        storeId={storeId}
      />
    </div>
  );
};

export default StoreFlyers;
