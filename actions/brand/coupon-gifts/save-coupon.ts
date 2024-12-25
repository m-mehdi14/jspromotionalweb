"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveCouponGift(
  couponData: Omit<
    {
      name: string;
      code: string;
      discount: number;
      image?: string;
      brandId: string;
      startDate: string;
      endDate: string;
      usageLimit: number;
    },
    "id"
  >
): Promise<{ success: boolean; message: string }> {
  try {
    if (
      !couponData.name ||
      !couponData.code ||
      !couponData.discount ||
      !couponData.startDate ||
      !couponData.endDate ||
      !couponData.usageLimit ||
      !couponData.brandId
    ) {
      return { success: false, message: "Required fields are missing." };
    }

    if (new Date(couponData.startDate) > new Date(couponData.endDate)) {
      return { success: false, message: "Invalid date range provided." };
    }

    const couponCollection = collection(db, "couponGifts");
    await addDoc(couponCollection, couponData);

    return { success: true, message: "Coupon gift created successfully." };
  } catch (error) {
    console.error("Error saving coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while creating the coupon gift.",
    };
  }
}
