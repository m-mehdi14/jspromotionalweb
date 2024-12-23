"use server";

import axios from "axios";

export async function saveCouponGift(
  couponData: Omit<
    {
      name: string;
      code: string;
      discount: string;
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
    const response = await axios.post<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/coupon-gifts/create`,
      couponData
    );

    if (response.status === 201) {
      return {
        success: true,
        message: response.data.message || "Coupon created successfully.",
      };
    }

    return { success: false, message: "Failed to create coupon." };
  } catch (error) {
    console.error("Error creating coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while creating the coupon.",
    };
  }
}
