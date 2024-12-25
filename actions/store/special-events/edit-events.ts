"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editSpecialEvent(
  eventId: string,
  updatedData: Partial<{
    name: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!eventId || Object.keys(updatedData).length === 0) {
      throw new Error("Event ID and updated data are required.");
    }

    const eventRef = doc(db, "specialEvents", eventId);
    await updateDoc(eventRef, updatedData);

    return { success: true, message: "Special event updated successfully." };
  } catch (error) {
    console.error("Error editing special event:", error);
    return { success: false, message: "Failed to update special event." };
  }
}
