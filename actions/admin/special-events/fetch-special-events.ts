"use server";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

interface SpecialEvent {
  id: string;
  brandId: string;
  description: string;
  endDate: string;
  image: string;
  name: string;
  startDate: string;
  storeId: string;
}

export async function fetchSpecialEvents(): Promise<SpecialEvent[]> {
  try {
    const eventsCollection = collection(db, "specialEvents");
    const snapshot = await getDocs(eventsCollection);

    const specialEvents: SpecialEvent[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        brandId: data.brandId,
        description: data.description,
        endDate: data.endDate,
        image: data.image,
        name: data.name,
        startDate: data.startDate,
        storeId: data.storeId,
      };
    });

    return specialEvents;
  } catch (error) {
    console.error("Error fetching special events:", error);
    throw new Error("Failed to fetch special events.");
  }
}
