"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchFlyersByStore(storeId: string) {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const flyerCollection = collection(db, "storeFlyers");
    const q = query(flyerCollection, where("storeId", "==", storeId));

    const snapshot = await getDocs(q);
    const flyers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return flyers;
  } catch (error) {
    console.error("Error fetching store flyers:", error);
    throw new Error("Failed to fetch store flyers.");
  }
}
