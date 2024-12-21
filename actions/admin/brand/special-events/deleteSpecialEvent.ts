"use server";

import axios, { AxiosError } from "axios";

export async function deleteSpecialEvent(
  eventId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!eventId) {
      return { success: false, message: "Event ID is required." };
    }

    // Make a DELETE request to the backend endpoint
    const response = await axios.delete<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/special-events/delete`,
      { data: { eventId } }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Event deleted successfully.",
      };
    }

    return { success: false, message: "Failed to delete event." };
  } catch (error: unknown) {
    console.error("Error deleting special event:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while deleting the event.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
