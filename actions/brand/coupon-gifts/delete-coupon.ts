"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function deleteCouponGift(
  couponId: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    const couponDocRef = doc(db, "couponGifts", couponId);
    await deleteDoc(couponDocRef);

    return { success: true, message: "Coupon gift deleted successfully." };
  } catch (error) {
    console.error("Error deleting coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while deleting the coupon gift.",
    };
  }
}
