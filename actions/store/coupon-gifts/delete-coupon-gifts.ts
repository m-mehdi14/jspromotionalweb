"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function deleteCouponGift(couponId: string) {
  try {
    if (!couponId) {
      throw new Error("Coupon ID is required.");
    }

    const couponRef = doc(db, "couponGifts", couponId);
    await deleteDoc(couponRef);

    return { success: true, message: "Coupon deleted successfully." };
  } catch (error) {
    console.error("Error deleting coupon gift:", error);
    return { success: false, message: "Failed to delete coupon gift." };
  }
}
