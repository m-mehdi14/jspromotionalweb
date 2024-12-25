"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchCouponGiftsByBrand(brandId: string) {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const couponCollection = collection(db, "couponGifts");
    const q = query(couponCollection, where("brandId", "==", brandId));

    const snapshot = await getDocs(q);
    const coupons = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return coupons;
  } catch (error) {
    console.error("Error fetching coupon gifts:", error);
    throw new Error("Failed to fetch coupon gifts.");
  }
}
