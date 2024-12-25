"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchBrandSettings(brandId: string) {
  try {
    if (!brandId) throw new Error("Brand ID is required.");
    const docRef = doc(db, "brands", brandId);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) throw new Error("Brand not found.");
    return snapshot.data();
  } catch (error) {
    console.error("Error fetching brand settings:", error);
    throw new Error("Failed to fetch brand settings.");
  }
}
