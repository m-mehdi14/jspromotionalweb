"use server";

import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

// Define the expected structure of user updates
interface UserUpdateData {
  userId?: string;
  fcmToken?: string;
  createdAt?: string;
}

// Function to update a user inside a postal code's postalusers collection
export async function UpdateUser(
  postalCode: string,
  userId: string,
  updates: UserUpdateData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!postalCode || !userId) {
      throw new Error("Postal code and user ID are required.");
    }

    const userDocRef = doc(db, `postalCodes/${postalCode}/postalusers`, userId);

    await updateDoc(userDocRef, { ...updates });

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: (error as Error).message };
  }
}
