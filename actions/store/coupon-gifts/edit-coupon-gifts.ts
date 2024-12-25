"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editCouponGift(couponId: string, updatedData) {
  try {
    if (!couponId || Object.keys(updatedData).length === 0) {
      throw new Error("Coupon ID and updated data are required.");
    }

    const couponRef = doc(db, "couponGifts", couponId);
    await updateDoc(couponRef, updatedData);

    return { success: true, message: "Coupon updated successfully." };
  } catch (error) {
    console.error("Error editing coupon gift:", error);
    return { success: false, message: "Failed to update coupon gift." };
  }
}
