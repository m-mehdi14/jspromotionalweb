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
import { getFavoritesFromFirebase } from "@/actions/get-favourites";
import { sendNotification } from "@/actions/send-notifications";

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

  // const handleSaveFlyer = async (flyerData: FlyerData) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (editingFlyer) {
  //       await editFlyer(editingFlyer.id, flyerData);
  //       toast.success("Flyer updated successfully!");
  //     } else {
  //       await saveFlyer(flyerData);
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

  // @ts-expect-error ignore
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

      // if (response?.success) {
      //   toast.success(
      //     isEdit ? "Flyer updated successfully!" : "Flyer created successfully!"
      //   );
      // } else {
      //   toast.error(response?.message || "Failed to save flyer.");
      //   return;
      // }

      if (response?.success == true) {
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
        onSave={handleSaveFlyer}
        // @ts-expect-error ignore
        flyer={editingFlyer}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default BrandFlyers;
