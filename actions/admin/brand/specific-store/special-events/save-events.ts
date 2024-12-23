"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveSpecialEvent(
  eventData: Omit<
    {
      name: string;
      description: string;
      image?: string;
      startDate: string;
      endDate: string;
      brandId: string;
      storeId: string;
    },
    "id"
  >
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (
      !eventData.name ||
      !eventData.description ||
      !eventData.brandId ||
      !eventData.storeId
    ) {
      return { success: false, message: "Required fields are missing." };
    }

    if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
      return {
        success: false,
        message: "Start date cannot be later than end date.",
      };
    }

    // Reference the 'specialEvents' collection and save the event
    const eventsCollection = collection(db, "specialEvents");
    await addDoc(eventsCollection, eventData);

    return { success: true, message: "Special event created successfully." };
  } catch (error) {
    console.error("Error saving special event:", error);
    return {
      success: false,
      message: "An error occurred while saving the special event.",
    };
  }
}
