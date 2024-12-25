"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchStoreSettings(storeId: string) {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const storeDoc = doc(db, "stores", storeId);
    const snapshot = await getDoc(storeDoc);

    if (!snapshot.exists()) {
      throw new Error("Store settings not found.");
    }

    return snapshot.data();
  } catch (error) {
    console.error("Error fetching store settings:", error);
    throw new Error("Failed to fetch store settings.");
  }
}
