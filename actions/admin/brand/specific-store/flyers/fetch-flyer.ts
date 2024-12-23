"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchFlyersByStore(brandId: string, storeId: string) {
  const flyersCollection = collection(db, "flyers");
  const q = query(
    flyersCollection,
    where("brandId", "==", brandId),
    where("storeId", "==", storeId)
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
