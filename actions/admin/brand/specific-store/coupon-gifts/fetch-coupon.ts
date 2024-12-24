"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchCouponGiftsByStore(
  brandId: string,
  storeId: string
) {
  try {
    if (!brandId || !storeId) {
      throw new Error("Brand ID and Store ID are required.");
    }

    const couponsCollection = collection(db, "couponGifts");
    const q = query(
      couponsCollection,
      where("brandId", "==", brandId),
      where("storeId", "==", storeId)
    );

    const snapshot = await getDocs(q);
    const couponGifts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return couponGifts;
  } catch (error) {
    console.error("Error fetching coupon gifts:", error);
    throw new Error("Failed to fetch coupon gifts.");
  }
}
