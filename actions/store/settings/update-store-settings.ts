"use server";

import axios, { AxiosError } from "axios";

export async function updateStorePassword(
  storeId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!storeId || !currentPassword || !newPassword) {
      return {
        success: false,
        message:
          "All fields are required (storeId, currentPassword, newPassword).",
      };
    }

    // Make a PUT request to the backend endpoint
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/store/password/update`,
      { storeId, currentPassword, newPassword }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Password updated successfully.",
      };
    }

    return { success: false, message: "Failed to update password." };
  } catch (error: unknown) {
    console.error("Error updating store password:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while updating the password.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
