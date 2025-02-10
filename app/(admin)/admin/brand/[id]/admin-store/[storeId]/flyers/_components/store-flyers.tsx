"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchFlyersByStore } from "@/actions/admin/brand/specific-store/flyers/fetch-flyer";
import { FlyerList } from "./FlyerList";
import { FlyerFormDialog } from "./FlyerFormDialog";
import { editFlyer } from "@/actions/admin/brand/specific-store/flyers/editFlyer";
import { saveFlyer } from "@/actions/admin/brand/specific-store/flyers/saveFlyer";
import { deleteFlyer } from "@/actions/admin/brand/specific-store/flyers/deleteFlyer";
import { Button } from "@/components/ui/button";
import { getFavoritesFromFirebase } from "@/actions/get-favourites";
import { sendNotification } from "@/actions/send-notifications";

interface AdminStoreFlyersProps {
  brandId: string;
  storeId: string;
}

const AdminStoreFlyers = ({ brandId, storeId }: AdminStoreFlyersProps) => {
  const [flyers, setFlyers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlyer, setEditingFlyer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchFlyers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFlyersByStore(brandId, storeId);
      // @ts-expect-error ignore
      setFlyers(data);
    } catch (error) {
      console.error("Error fetching flyers:", error);
      toast.error("Failed to fetch flyers.");
    } finally {
      setIsLoading(false);
    }
  };
  // @ts-expect-error ignore
  // const handleSaveFlyer = async (flyerData) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (editingFlyer) {
  //       // @ts-expect-error ignore
  //       await editFlyer(editingFlyer.id, flyerData);
  //       toast.success("Flyer updated successfully!");
  //     } else {
  //       await saveFlyer({ ...flyerData, brandId, storeId });
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

  // const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
  //   setIsSubmitting(true);

  //   try {
  //     let isEdit = false;
  //     let response;

  //     if (editingFlyer) {
  //       // If editing, call editFlyer
  //       // @ts-expect-error ignore
  //       response = await editFlyer(editingFlyer.id, flyerData);
  //       isEdit = true;
  //     } else {
  //       // If creating, call saveFlyer
  //       response = await saveFlyer(flyerData);
  //     }

  //     if (response?.success) {
  //       toast.success(
  //         isEdit ? "Flyer updated successfully!" : "Flyer created successfully!"
  //       );
  //     } else {
  //       toast.error(response?.message || "Failed to save flyer.");
  //       return;
  //     }

  //     // Fetch all favorites to get FCM tokens
  //     const favorites = await getFavoritesFromFirebase();

  //     // Extract FCM tokens
  //     // const fcmTokens = favorites
  //     //   // @ts-expect-error ignore
  //     //   .map((fav) => fav.fcmToken)
  //     //   .filter((token) => token);
  //     // Extract unique FCM tokens
  //     const fcmTokens = [
  //       ...new Set(
  //         favorites
  //           // @ts-expect-error ignore
  //           .map((fav) => fav.fcmToken)
  //           .filter((token) => token) // Remove falsy values (e.g., null, undefined)
  //       ),
  //     ];

  //     if (fcmTokens.length > 0) {
  //       // Prepare and send notifications
  //       const notificationTitle = editingFlyer
  //         ? `Flyer Updated: ${flyerData.title}`
  //         : `New Flyer: ${flyerData.title}`;
  //       const notificationBody = editingFlyer
  //         ? `The flyer "${flyerData.title}" has been updated. Check out the latest details!`
  //         : `A new flyer "${flyerData.title}" is now available. Don't miss out on our latest offers!`;

  //       await sendNotification(fcmTokens, notificationTitle, notificationBody);
  //       console.log("Notifications sent successfully.");
  //     } else {
  //       console.log("No FCM tokens found to send notifications.");
  //     }

  //     // Fetch latest flyers and reset state
  //     await fetchFlyers();
  //     setIsDialogOpen(false); // Close dialog
  //     setEditingFlyer(null); // Reset editing flyer
  //   } catch (error) {
  //     console.error("Error in handleSaveFlyer:", error);
  //     toast.error("An unexpected error occurred while saving the flyer.");
  //   } finally {
  //     setIsSubmitting(false); // Reset submitting state
  //   }
  // };

  const handleSaveFlyer = async (flyerData: Omit<Flyer, "id">) => {
    setIsSubmitting(true);

    try {
      const isEditing = Boolean(editingFlyer);
      const response = isEditing
        ? await editFlyer(editingFlyer!.id, flyerData)
        : await saveFlyer(flyerData);

      if (!response?.success) {
        toast.error(response?.message || "Failed to save flyer.");
        return;
      }

      toast.success(
        isEditing
          ? "Flyer updated successfully!"
          : "Flyer created successfully!"
      );

      // Fetch all favorites to get FCM tokens
      const favorites: { id: string; fcmToken?: string }[] =
        await getFavoritesFromFirebase();

      // Extract unique FCM tokens
      const fcmTokens = [
        ...new Set(
          favorites
            .map((fav: { fcmToken?: string }) => fav.fcmToken)
            .filter(Boolean)
        ),
      ];

      if (fcmTokens.length > 0) {
        const notificationTitle = isEditing
          ? `Flyer Updated: ${flyerData.title}`
          : `New Flyer: ${flyerData.title}`;
        const notificationBody = isEditing
          ? `The flyer "${flyerData.title}" has been updated. Check out the latest details!`
          : `A new flyer "${flyerData.title}" is now available. Don't miss out on our latest offers!`;

        await sendNotification(
          fcmTokens.filter((token): token is string => !!token),
          notificationTitle,
          notificationBody
        );
        console.log("✅ Notifications sent successfully.");
      } else {
        console.log("ℹ️ No FCM tokens found to send notifications.");
      }

      // Refresh Flyers and Reset State
      await fetchFlyers();
      setIsDialogOpen(false);
      setEditingFlyer(null);
    } catch (error) {
      console.error("❌ [handleSaveFlyer] Error:", error);
      toast.error("An unexpected error occurred while saving the flyer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // @ts-expect-error ignore
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
    if (brandId && storeId) {
      fetchFlyers();
    }
  }, [brandId, storeId]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Flyers for Store</h1>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded"
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
        brandId={brandId}
        storeId={storeId}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AdminStoreFlyers;
