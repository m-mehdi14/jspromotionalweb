"use server";

import axios, { AxiosError } from "axios";

export async function editSpecialEvent(
  eventId: string,
  updatedData: Partial<{
    name: string;
    description?: string;
    image?: string;
    startDate?: string;
    endDate?: string;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate inputs
    if (!eventId) {
      return { success: false, message: "Event ID is required." };
    }

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
      `${process.env.BACKEND_URL}/admin/special-events/edit`,
      { eventId, ...payload }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Event updated successfully.",
      };
    }

    return { success: false, message: "Failed to update event." };
  } catch (error: unknown) {
    console.error("Error updating special event:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while updating the event.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
