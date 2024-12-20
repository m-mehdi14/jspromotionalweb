"use server";

import { addDoc, collection } from "firebase/firestore";
import { Flyer } from "@/app/(admin)/admin/brand/[id]/admin-store/_components/types";
import { db } from "@/config/firebase";

// Save a flyer to Firestore
export async function saveFlyer(flyerData: Omit<Flyer, "id">): Promise<Flyer> {
  try {
    if (!flyerData.brandId) {
      throw new Error("Brand ID is required.");
    }

    // Reference the "flyers" collection
    const flyersCollection = collection(db, "flyers");

    // Add the flyer data to the collection
    const docRef = await addDoc(flyersCollection, flyerData);

    // Return the newly saved flyer data with the generated ID
    return { id: docRef.id, ...flyerData };
  } catch (error) {
    console.error("Error saving flyer:", error);
    throw new Error("Failed to save the flyer. Please try again.");
  }
}
