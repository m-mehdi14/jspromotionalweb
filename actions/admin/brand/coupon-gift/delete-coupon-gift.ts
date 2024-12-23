"use server";

import axios from "axios";

export async function deleteCouponGift(
  couponId: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    const response = await axios.delete<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/coupon-gifts/delete`,
      { data: { couponId } }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Coupon deleted successfully.",
      };
    }

    return { success: false, message: "Failed to delete coupon." };
  } catch (error) {
    console.error("Error deleting coupon gift:", error);
    return {
      success: false,
      message: "An error occurred while deleting the coupon.",
    };
  }
}
