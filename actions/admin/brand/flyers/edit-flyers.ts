"use server";

import axios, { AxiosError } from "axios";

export async function editFlyer(
  flyerId: string,
  updatedData: Partial<{
    title: string;
    description: string;
    imageUrl: string;
    [key: string]: unknown; // Allows for additional fields
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate inputs
    if (!flyerId) {
      return {
        success: false,
        message: "Flyer ID is missing.",
      };
    }

    if (Object.keys(updatedData).length === 0) {
      return {
        success: false,
        message: "No data provided for update.",
      };
    }

    const dataa = {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    // Make a PUT request to the /flyer/edit endpoint
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/flyer/edit`,
      { flyerId, updatedData: dataa }
    );

    // Handle success response
    if (response.status === 200) {
      return {
        success: true,
        message:
          response.data.message || "Flyer has been successfully updated.",
      };
    }

    // Handle unexpected status codes
    return {
      success: false,
      message: response.data.message || "Failed to update the flyer.",
    };
  } catch (error: unknown) {
    console.error("Error updating flyer:", error);

    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while updating the flyer.";

      return {
        success: false,
        message: errorMessage,
      };
    }

    // Handle unexpected non-Axios errors
    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
