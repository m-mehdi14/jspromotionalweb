"use server";

import axios, { AxiosError } from "axios";

export async function updateBrandSettings(
  brandId: string,
  updatedData: Partial<{
    name: string;
    description: string;
    email: string;
    logo: string | null;
    notifications: boolean;
    password?: string;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!brandId) throw new Error("Brand ID is required.");
    if (Object.keys(updatedData).length === 0) {
      return { success: false, message: "No data provided for update." };
    }

    // Add updatedAt timestamp
    const payload = {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };

    // Make a PUT request to the backend endpoint
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/brand/settings`,
      { brandId, ...payload }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Settings updated successfully.",
      };
    }

    return { success: false, message: "Failed to update settings." };
  } catch (error: unknown) {
    console.error("Error updating brand settings:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while updating settings.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
