"use server";

import { db } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

// Delete a user from a postal code's postalusers collection
export async function DeleteUser(postalCode: string, userId: string) {
  try {
    if (!postalCode || !userId)
      throw new Error("Postal code and user ID are required.");

    const userDocRef = doc(db, `postalCodes/${postalCode}/postalusers`, userId);
    await deleteDoc(userDocRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: (error as Error).message };
  }
}
