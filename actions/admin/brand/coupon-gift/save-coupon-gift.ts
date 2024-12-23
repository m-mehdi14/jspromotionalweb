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
    // Validate required fields
    if (!couponData.name || !couponData.code || !couponData.brandId) {
      return {
        success: false,
        message: "Name, Code, and Brand ID are required fields.",
      };
    }

    if (couponData.discount.trim() === "") {
      return {
        success: false,
        message: "Discount is required.",
      };
    }

    const discountValue = Number(couponData.discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      return {
        success: false,
        message: "Discount must be a valid number between 1 and 100.",
      };
    }

    if (!couponData.startDate || !couponData.endDate) {
      return {
        success: false,
        message: "Start Date and End Date are required.",
      };
    }

    const startDate = new Date(couponData.startDate);
    const endDate = new Date(couponData.endDate);
    if (startDate > endDate) {
      return {
        success: false,
        message: "Start Date cannot be after End Date.",
      };
    }

    if (!couponData.usageLimit || couponData.usageLimit <= 0) {
      return {
        success: false,
        message: "Usage Limit must be a positive number.",
      };
    }

    if (couponData.image && typeof couponData.image !== "string") {
      return {
        success: false,
        message: "Image must be a valid string URL.",
      };
    }

    // Reference the 'couponGifts' collection in Firestore
    const couponsCollection = collection(db, "couponGifts");

    // Add the new coupon document
    await addDoc(couponsCollection, {
      ...couponData,
      discount: discountValue.toString(), // Ensure discount is stored as a string
    });

    return {
      success: true,
      message: "Coupon created successfully.",
    };
  } catch (error) {
    console.error("Error creating coupon gift:", error);

    return {
      success: false,
      message: "An error occurred while creating the coupon.",
    };
  }
}
