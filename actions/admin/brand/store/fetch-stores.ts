"use server";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchStoresByBrand(brandId: string) {
  try {
    const storesRef = collection(db, "stores");
    const q = query(storesRef, where("brandId", "==", brandId));
    const querySnapshot = await getDocs(q);

    const stores = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
