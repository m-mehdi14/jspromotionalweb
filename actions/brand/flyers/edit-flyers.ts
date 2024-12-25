"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editFlyer(
  flyerId: string,
  updatedData: Partial<{
    title: string;
    description: string;
    image?: string;
    validFrom: string;
    validTo: string;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!flyerId) {
      return { success: false, message: "Flyer ID is required." };
    }

    if (updatedData.validFrom && updatedData.validTo) {
      if (new Date(updatedData.validFrom) > new Date(updatedData.validTo)) {
        return { success: false, message: "Invalid date range provided." };
      }
    }

    const flyerDocRef = doc(db, "flyers", flyerId);
    await updateDoc(flyerDocRef, updatedData);

    return { success: true, message: "Flyer updated successfully." };
  } catch (error) {
    console.error("Error editing flyer:", error);
    return {
      success: false,
      message: "An error occurred while updating the flyer.",
    };
  }
}
