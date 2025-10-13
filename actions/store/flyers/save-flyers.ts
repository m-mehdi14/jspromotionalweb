"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveFlyer(
  flyerData: Omit<
    {
      title: string;
      description: string;
      image?: string;
      validFrom: string;
      validTo: string;
      storeId: string;
    },
    "id"
  >
): Promise<{ success: boolean; message: string }> {
  try {
    if (
      !flyerData.title ||
      !flyerData.validFrom ||
      !flyerData.validTo ||
      !flyerData.storeId
    ) {
      return { success: false, message: "Required fields are missing." };
    }

    if (!flyerData.image) {
      return {
        success: false,
        message: "Image is Required ",
      };
    }

    if (new Date(flyerData.validFrom) > new Date(flyerData.validTo)) {
      return { success: false, message: "Invalid date range provided." };
    }

    const flyerCollection = collection(db, "storeFlyers");
    await addDoc(flyerCollection, flyerData);

    return { success: true, message: "Flyer created successfully." };
  } catch (error: any) {
    console.error("Error saving flyer:", error);

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
      message: error?.message || "An error occurred while creating the flyer.",
    };
  }
}
