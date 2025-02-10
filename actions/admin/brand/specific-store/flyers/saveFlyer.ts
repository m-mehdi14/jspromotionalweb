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
      brandId: string;
      storeId: string;
    },
    "id"
  >
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (
      !flyerData.title ||
      !flyerData.description ||
      !flyerData.brandId ||
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
      return {
        success: false,
        message: "Valid From date cannot be later than Valid To date.",
      };
    }

    // Reference the 'flyers' collection and save the flyer
    const flyersCollection = collection(db, "flyers");
    await addDoc(flyersCollection, flyerData);

    return { success: true, message: "Flyer created successfully." };
  } catch (error) {
    console.error("Error saving flyer:", error);
    return {
      success: false,
      message: "An error occurred while saving the flyer.",
    };
  }
}
