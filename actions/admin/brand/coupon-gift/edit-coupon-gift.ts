"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editCouponGift(
  couponId: string,
  updatedData: Partial<{
    name: string;
    code: string;
    discount: string;
    image?: string;
    startDate?: string;
    endDate?: string;
    usageLimit?: number;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    if (Object.keys(updatedData).length === 0) {
      return { success: false, message: "No data provided for update." };
    }

    const couponDocRef = doc(db, "couponGifts", couponId);

    await updateDoc(couponDocRef, updatedData);

    return { success: true, message: "Coupon updated successfully." };
  } catch (error) {
    console.error("Error updating coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while updating the coupon.",
    };
  }
}
