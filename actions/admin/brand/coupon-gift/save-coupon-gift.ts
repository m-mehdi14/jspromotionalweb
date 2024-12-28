"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function saveCouponGift(
  couponData: Omit<
    {
      name: string;
      code: string;
      discount: string; // Discount remains as a string
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
    console.log("Received couponData for save:", couponData);

    // Validate required fields
    if (!couponData.name || !couponData.code || !couponData.brandId) {
      throw new Error("Name, Code, and Brand ID are required.");
    }

    const discountValue = Number(couponData.discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      throw new Error("Discount must be a valid number between 1 and 100.");
    }

    const startDate = new Date(couponData.startDate);
    const endDate = new Date(couponData.endDate);
    if (startDate > endDate) {
      throw new Error("Start Date cannot be after End Date.");
    }

    // Reference the 'couponGifts' collection in Firestore
    const couponsCollection = collection(db, "couponGifts");

    // Add the new coupon document
    await addDoc(couponsCollection, {
      ...couponData,
      discount: discountValue.toString(), // Store discount as a string
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "Coupon created successfully.",
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error saving coupon gift:", error.message);
    } else {
      console.error("Error saving coupon gift:", error);
    }
    return {
      success: false,
      message:
        (error as Error).message ||
        "An error occurred while saving the coupon.",
    };
  }
}
