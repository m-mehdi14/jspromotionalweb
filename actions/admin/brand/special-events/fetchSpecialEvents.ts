"use server";

import { SpecialEvent } from "@/app/(admin)/admin/brand/[id]/admin-special-events/_components/types";
import axios, { AxiosError } from "axios";

export async function fetchSpecialEvents(
  brandId: string
): Promise<SpecialEvent[]> {
  try {
    // Validate input
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    // Make a GET request to the backend endpoint
    const response = await axios.get<{
      success: boolean;
      events: SpecialEvent[];
    }>(`${process.env.BACKEND_URL}/admin/special-events`, {
      params: { brandId },
    });

    // Return the list of events if successful
    if (response.data.success) {
      return response.data.events || [];
    }

    console.error("Failed to fetch events:", response.data);
    return [];
  } catch (error: unknown) {
    console.error("Error fetching special events:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error(
        "Axios error while fetching events:",
        axiosError.response?.data?.message
      );
    }

    return [];
  }
}
