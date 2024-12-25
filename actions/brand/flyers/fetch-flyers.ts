"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchBrandFlyers(brandId: string) {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const flyersCollection = collection(db, "flyers");
    const q = query(flyersCollection, where("brandId", "==", brandId));

    const snapshot = await getDocs(q);
    const flyers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return flyers;
  } catch (error) {
    console.error("Error fetching brand flyers:", error);
    throw new Error("Failed to fetch brand flyers.");
  }
}
