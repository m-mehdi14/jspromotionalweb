"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchSpecialEventsByStore(
  brandId: string,
  storeId: string
) {
  const eventsCollection = collection(db, "specialEvents");
  const q = query(
    eventsCollection,
    where("brandId", "==", brandId),
    where("storeId", "==", storeId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
