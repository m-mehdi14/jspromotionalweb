"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Flyer } from "@/app/(admin)/admin/brand/[id]/admin-store/_components/types";

// Define the Flyer interface for type safety
// export interface Flyer {
//   id: string;
//   title: string;
//   description: string;
//   image: string | null;
//   brandId: string;
//   storeIds?: string[];
//   validFrom: string;
//   validTo: string;
// }

// Fetch flyers by brand
export async function fetchFlyersByBrand(brandId: string): Promise<Flyer[]> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    // Reference the "flyers" collection
    const flyersCollection = collection(db, "flyers");

    // Create a query to filter flyers by brandId
    const q = query(flyersCollection, where("brandId", "==", brandId));

    // Execute the query and map the results
    const querySnapshot = await getDocs(q);
    const flyers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Flyer[];

    // Return the fetched flyers
    return flyers;
  } catch (error) {
    console.error("Error fetching flyers:", error);
    return [];
  }
}
