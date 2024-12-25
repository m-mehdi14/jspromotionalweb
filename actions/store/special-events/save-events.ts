"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveSpecialEvent(eventData: {
  name: string;
  description?: string;
  image?: string;
  startDate: string;
  endDate: string;
  storeId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    if (
      !eventData.name ||
      !eventData.startDate ||
      !eventData.endDate ||
      !eventData.storeId
    ) {
      throw new Error("Required fields are missing.");
    }

    const eventsRef = collection(db, "specialEvents");
    await addDoc(eventsRef, eventData);

    return { success: true, message: "Special event created successfully." };
  } catch (error) {
    console.error("Error saving special event:", error);
    return { success: false, message: "Failed to create special event." };
  }
}
