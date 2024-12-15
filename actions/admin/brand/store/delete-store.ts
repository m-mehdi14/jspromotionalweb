"use server";

import axios from "axios";

interface ErrorType {
  response?: {
    data: {
      message?: string;
    };
  };
  message?: string;
}

export async function deleteStore({
  brandId,
  storeId,
}: {
  brandId: string;
  storeId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Make a DELETE request to the API endpoint
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/admin/store/delete`,
      {
        data: { brandId, storeId }, // Pass data in the `data` field for DELETE requests in axios
      }
    );

    return {
      success: true,
      message: response.data?.message || "Store successfully deleted.",
    };
  } catch (error: ErrorType | unknown) {
    const err = error as ErrorType;
    console.error("Error deleting store:", err);
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        "An error occurred while deleting the store.",
    };
  }
}
