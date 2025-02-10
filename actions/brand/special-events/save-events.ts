"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveSpecialEvent(
  eventData: Omit<
    {
      name: string;
      description?: string;
      image?: string;
      startDate: string;
      endDate: string;
      brandId: string;
    },
    "id"
  >
): Promise<{ success: boolean; message: string }> {
  try {
    if (
      !eventData.name ||
      !eventData.startDate ||
      !eventData.endDate ||
      !eventData.brandId
    ) {
      return { success: false, message: "Required fields are missing." };
    }

    if (!eventData.image) {
      return {
        success: false,
        message: "Image is Required",
      };
    }
    if (new Date(eventData.startDate) > new Date(eventData.endDate)) {
      return { success: false, message: "Invalid date range provided." };
    }

    const eventsCollection = collection(db, "specialEvents");
    await addDoc(eventsCollection, eventData);

    return { success: true, message: "Special event created successfully." };
  } catch (error) {
    console.error("Error saving special event:", error);
    return {
      success: false,
      message: "An error occurred while creating the event.",
    };
  }
}
