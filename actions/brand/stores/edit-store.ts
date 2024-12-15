"use server";

import axios from "axios";

interface UpdatedStoreData {
  name: string;
  email: string;
  description: string;
  image: string;
  postalCode: string;
  updatedAt: string;
  password?: string;
  storeId: string;
  brandId: string;
}
export interface ErrorType {
  response?: {
    data: {
      message?: string;
    };
  };
  message?: string;
}

export async function editStore({
  storeId,
  brandId,
  name,
  email,
  password,
  description,
  image,
  postalCode,
}: {
  storeId: string;
  brandId: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  image: string;
  postalCode: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Prepare the request payload
    const updatedData: Partial<UpdatedStoreData> = {
      storeId,
      brandId,
      name,
      email,
      description,
      image,
      postalCode,
      password, // Include password only if provided
    };

    // Make a PUT request to the /edit endpoint
    const response = await axios.put(
      `${process.env.BACKEND_URL}/brand/store/edit`,
      updatedData
    );

    // Handle success
    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Store successfully updated.",
      };
    }

    // Handle non-success status codes
    return {
      success: false,
      message: response.data.message || "Failed to update the store.",
    };
  } catch (error: ErrorType | unknown) {
    const err = error as ErrorType;
    console.error("Error updating store:", error);

    // Handle Axios error response
    const errorMessage =
      err.response?.data?.message ||
      "An error occurred while updating the store.";

    return {
      success: false,
      message: errorMessage,
    };
  }
}
