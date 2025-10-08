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

    // Check if BACKEND_URL is configured
    if (!process.env.BACKEND_URL) {
      throw new Error("BACKEND_URL environment variable is not configured.");
    }

    console.log(`Fetching special events for brandId: ${brandId}`);
    console.log(`Backend URL: ${process.env.BACKEND_URL}/admin/special-events`);

    // Make a GET request to the backend endpoint
    const response = await axios.get<{
      success: boolean;
      events: SpecialEvent[];
    }>(`${process.env.BACKEND_URL}/admin/special-events`, {
      params: { brandId },
      timeout: 10000, // 10 second timeout
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`Response status: ${response.status}`);
    console.log(`Response data:`, response.data);

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
      console.error("Axios error details:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message,
        url: axiosError.config?.url,
      });

      // Handle specific error cases
      if (axiosError.response?.status === 500) {
        console.error(
          "Server error - backend may be down or endpoint not implemented"
        );
      } else if (axiosError.response?.status === 404) {
        console.error("Endpoint not found - check if the API route exists");
      } else if (axiosError.response?.status === 401) {
        console.error("Unauthorized - check authentication");
      }
    }

    return [];
  }
}
