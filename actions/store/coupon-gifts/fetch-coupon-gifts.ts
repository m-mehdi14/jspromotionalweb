"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchCouponGiftsByStore(storeId: string) {
  try {
    const couponRef = collection(db, "couponGifts");
    const q = query(couponRef, where("storeId", "==", storeId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching coupon gifts:", error);
    throw new Error("Failed to fetch coupon gifts.");
  }
}
