"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function deleteSpecialEvent(
  eventId: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!eventId) {
      return { success: false, message: "Event ID is required." };
    }

    const eventDocRef = doc(db, "specialEvents", eventId);
    await deleteDoc(eventDocRef);

    return { success: true, message: "Special event deleted successfully." };
  } catch (error) {
    console.error("Error deleting special event:", error);
    return {
      success: false,
      message: "An error occurred while deleting the event.",
    };
  }
}
