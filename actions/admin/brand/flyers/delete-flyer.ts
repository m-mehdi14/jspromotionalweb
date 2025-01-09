"use server";

import axios from "axios";

export async function deleteFlyer(
  flyerId: string
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate input
    if (!flyerId) {
      return {
        success: false,
        message: "Flyer ID is required.",
      };
    }

    // Make a DELETE request to the /flyer/delete endpoint
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/admin/flyer/delete`,
      {
        data: { flyerId },
      }
    );
    console.log("🚀 ~ response:", response);

    // Handle success response
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Flyer successfully deleted.",
      };
    }

    // Handle non-success status codes
    return {
      success: false,
      message: response.data.message || "Failed to delete the flyer.",
    };
  } catch (error: unknown) {
    console.error("Error deleting flyer:", error);

    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the flyer.";
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
