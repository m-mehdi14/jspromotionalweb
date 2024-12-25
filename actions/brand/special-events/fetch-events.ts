"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchSpecialEventsByBrand(brandId: string) {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const eventsCollection = collection(db, "specialEvents");
    const q = query(eventsCollection, where("brandId", "==", brandId));

    const snapshot = await getDocs(q);
    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return events;
  } catch (error) {
    console.error("Error fetching special events:", error);
    throw new Error("Failed to fetch special events.");
  }
}
