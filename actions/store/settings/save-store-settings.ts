"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveStoreSettings(storeId: string, settings) {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const storeDoc = doc(db, "stores", storeId);
    await updateDoc(storeDoc, settings);

    return { success: true, message: "Settings updated successfully." };
  } catch (error) {
    console.error("Error saving store settings:", error);
    throw new Error("Failed to save store settings.");
  }
}
