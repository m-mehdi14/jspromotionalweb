"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Flyer } from "@/app/(admin)/admin/brand/[id]/admin-store/_components/types";

export async function editFlyer(
  flyerId: string,
  updatedData: Partial<Flyer>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!flyerId) {
      return {
        success: false,
        message: "Flyer ID is missing.",
      };
    }

    if (Object.keys(updatedData).length === 0) {
      return {
        success: false,
        message: "No data provided for update.",
      };
    }

    // Reference the specific flyer document in Firestore
    const flyerDocRef = doc(db, "flyers", flyerId);

    // Update the flyer document with the new data
    await updateDoc(flyerDocRef, updatedData);

    return {
      success: true,
      message: "Flyer has been successfully updated.",
    };
  } catch (error) {
    console.error("Error updating flyer:", error);

    let errorMessage = "Failed to update the flyer. Please try again.";
    if (error instanceof Error) {
      if (error.message.includes("permission-denied")) {
        errorMessage = "You do not have permission to perform this action.";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
}
