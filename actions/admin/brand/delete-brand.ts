"use server";

import axios from "axios";

export async function deleteBrand({
  adminId,
  brandId,
}: {
  adminId: string;
  brandId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/admin/brand/delete`,
      {
        data: {
          adminId,
          brandId,
        },
      }
    );

    if (response.data.success) {
      return { success: true, message: response.data.message };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to delete brand.",
      };
    }
  } catch (error: unknown) {
    console.error("Error in deleteBrand server action:", error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message:
          error.response.data?.message ||
          "An error occurred while deleting the brand.",
      };
    }

    return { success: false, message: "Unexpected error occurred." };
  }
}
