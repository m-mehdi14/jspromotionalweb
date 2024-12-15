"use server";

import axios from "axios";
import { ErrorType } from "./edit-store";

export async function deleteStore({
  storeId,
  brandId,
}: {
  storeId: string;
  brandId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Make a DELETE request to the /delete endpoint
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/brand/store/delete`,
      {
        data: {
          storeId,
          brandId,
        },
      }
    );

    // Handle success
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Store successfully deleted.",
      };
    }

    // Handle non-success status codes
    return {
      success: false,
      message: response.data.message || "Failed to delete the store.",
    };
  } catch (error: ErrorType | unknown) {
    const err = error as ErrorType;
    console.error("❌ Error deleting store:", error);

    // Handle Axios error response
    const errorMessage =
      err.response?.data?.message ||
      "An error occurred while deleting the store.";

    return {
      success: false,
      message: errorMessage,
    };
  }
}
