"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function editCouponGift(
  couponId: string,
  updatedData: Partial<{
    name: string;
    code: string;
    discount: number;
    image?: string;
    startDate: string;
    endDate: string;
    usageLimit: number;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    if (updatedData.startDate && updatedData.endDate) {
      if (new Date(updatedData.startDate) > new Date(updatedData.endDate)) {
        return { success: false, message: "Invalid date range provided." };
      }
    }

    const couponDocRef = doc(db, "couponGifts", couponId);
    await updateDoc(couponDocRef, updatedData);

    return { success: true, message: "Coupon gift updated successfully." };
  } catch (error) {
    console.error("Error editing coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while updating the coupon gift.",
    };
  }
}
