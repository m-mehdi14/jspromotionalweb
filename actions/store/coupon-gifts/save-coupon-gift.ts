"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveCouponGift(couponData) {
  try {
    if (!couponData.name || !couponData.code || !couponData.storeId) {
      throw new Error("Required fields are missing.");
    }

    const couponRef = collection(db, "couponGifts");
    await addDoc(couponRef, couponData);

    return { success: true, message: "Coupon created successfully." };
  } catch (error) {
    console.error("Error saving coupon gift:", error);
    return { success: false, message: "Failed to create coupon gift." };
  }
}
