"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editSpecialEvent(
  eventId: string,
  updatedData: Partial<{
    name: string;
    description: string;
    image?: string;
    startDate: string;
    endDate: string;
    brandId: string;
    storeId: string;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!eventId) {
      return { success: false, message: "Event ID is required." };
    }

    if (updatedData.startDate && updatedData.endDate) {
      if (new Date(updatedData.startDate) > new Date(updatedData.endDate)) {
        return {
          success: false,
          message: "Start date cannot be later than end date.",
        };
      }
    }

    // Reference the event document
    const eventDocRef = doc(db, "specialEvents", eventId);

    // Update the event document
    await updateDoc(eventDocRef, updatedData);

    return { success: true, message: "Special event updated successfully." };
  } catch (error) {
    console.error("Error editing special event:", error);
    return {
      success: false,
      message: "An error occurred while updating the special event.",
    };
  }
}
