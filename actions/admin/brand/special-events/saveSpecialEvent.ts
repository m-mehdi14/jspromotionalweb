"use server";

import axios, { AxiosError } from "axios";

export async function saveSpecialEvent(
  eventData: Omit<
    {
      id: string; // Omit `id` because it is auto-generated
      name: string;
      description?: string;
      image?: string;
      brandId: string;
      startDate: string;
      endDate: string;
    },
    "id"
  >
): Promise<{ success: boolean; message: string; eventId?: string }> {
  try {
    // Make a POST request to the backend endpoint
    const response = await axios.post<{ message: string; eventId: string }>(
      `${process.env.BACKEND_URL}/admin/special-events/create`,
      eventData
    );

    if (response.status === 201) {
      return {
        success: true,
        message: response.data.message || "Event created successfully.",
        eventId: response.data.eventId, // Return the event ID from the response
      };
    }

    return { success: false, message: "Failed to create event." };
  } catch (error: unknown) {
    console.error("Error creating special event:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while creating the event.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
