"use server";

import axios, { AxiosError } from "axios";

export async function deleteCouponGift(
  couponId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    // Make a DELETE request to the backend endpoint
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
  } catch (error: unknown) {
    console.error("Error deleting coupon gift:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while deleting the coupon.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
