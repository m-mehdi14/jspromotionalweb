"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function deleteSpecialEvent(
  eventId: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!eventId) {
      throw new Error("Event ID is required.");
    }

    const eventRef = doc(db, "specialEvents", eventId);
    await deleteDoc(eventRef);

    return { success: true, message: "Special event deleted successfully." };
  } catch (error) {
    console.error("Error deleting special event:", error);
    return { success: false, message: "Failed to delete special event." };
  }
}
