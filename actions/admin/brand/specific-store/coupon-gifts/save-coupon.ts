"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveCouponGift(
  couponData: Omit<
    {
      name: string;
      code: string;
      discount: string;
      image?: string;
      brandId: string;
      storeId: string;
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
      !couponData.brandId ||
      !couponData.storeId
    ) {
      return { success: false, message: "Required fields are missing." };
    }

    if (new Date(couponData.startDate) > new Date(couponData.endDate)) {
      return {
        success: false,
        message: "Start date cannot be later than end date.",
      };
    }

    const couponsCollection = collection(db, "couponGifts");
    await addDoc(couponsCollection, couponData);

    return { success: true, message: "Coupon gift created successfully." };
  } catch (error) {
    console.error("Error saving coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while creating the coupon gift.",
    };
  }
}
