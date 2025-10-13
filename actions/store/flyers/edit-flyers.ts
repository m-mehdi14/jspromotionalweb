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

    const flyerDocRef = doc(db, "storeFlyers", flyerId);
    await updateDoc(flyerDocRef, updatedData);

    return { success: true, message: "Flyer updated successfully." };
  } catch (error: any) {
    console.error("Error editing flyer:", error);

    // Handle specific Firebase errors
    if (
      error?.code === "invalid-argument" &&
      error?.message?.includes("longer than")
    ) {
      return {
        success: false,
        message:
          "Image file is too large. Please use a smaller image (under 1MB).",
      };
    }

    return {
      success: false,
      message: error?.message || "An error occurred while updating the flyer.",
    };
  }
}
