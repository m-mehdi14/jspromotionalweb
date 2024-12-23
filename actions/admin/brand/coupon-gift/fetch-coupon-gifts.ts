"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CouponGift } from "@/app/(admin)/admin/brand/[id]/admin-coupon-gift/_components/types";

export async function fetchCouponGifts(brandId: string): Promise<CouponGift[]> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const couponsCollection = collection(db, "couponGifts");
    const q = query(couponsCollection, where("brandId", "==", brandId));

    const querySnapshot = await getDocs(q);
    const couponGifts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CouponGift[];

    return couponGifts;
  } catch (error) {
    console.error("Error fetching coupon gifts:", error);
    return [];
  }
}
