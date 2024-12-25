"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchSpecialEventsByStore(storeId: string) {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const eventsRef = collection(db, "specialEvents");
    const q = query(eventsRef, where("storeId", "==", storeId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching special events:", error);
    throw new Error("Failed to fetch special events.");
  }
}
