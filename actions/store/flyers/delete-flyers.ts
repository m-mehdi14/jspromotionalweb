"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function deleteFlyer(
  flyerId: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!flyerId) {
      return { success: false, message: "Flyer ID is required." };
    }

    const flyerDocRef = doc(db, "storeFlyers", flyerId);
    await deleteDoc(flyerDocRef);

    return { success: true, message: "Flyer deleted successfully." };
  } catch (error) {
    console.error("Error deleting flyer:", error);
    return {
      success: false,
      message: "An error occurred while deleting the flyer.",
    };
  }
}
