"use server";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Flyer {
  id: string;
  brandId: string;
  title: string;
  description: string;
  image: string | null;
  storeId: string;
  validFrom: string;
  validTo: string;
  createdAt: string;
}

export async function fetchFlyers(): Promise<Flyer[]> {
  try {
    const flyersCollection = collection(db, "flyers");
    const snapshot = await getDocs(flyersCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Flyer[];
  } catch (error) {
    console.error("Error fetching flyers:", error);
    return [];
  }
}

export async function fetchAllFlyersAndStoreFlyers() {
  try {
    // Fetch Flyers
    const flyersCollection = collection(db, "flyers");
    const flyersSnapshot = await getDocs(flyersCollection);
    const flyers = flyersSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "flyer",
      ...doc.data(),
    }));

    // Fetch Store Flyers
    const storeFlyersCollection = collection(db, "storeFlyers");
    const storeFlyersSnapshot = await getDocs(storeFlyersCollection);
    const storeFlyers = storeFlyersSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "storeFlyer",
      ...doc.data(),
    }));

    // Merge Both Collections
    const allFlyers = [...flyers, ...storeFlyers];
    return { success: true, data: allFlyers };
  } catch (error) {
    console.error("Error fetching flyers and store flyers:", error);
    return { success: false, error: "Failed to fetch flyers." };
  }
}
