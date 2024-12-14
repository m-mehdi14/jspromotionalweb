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

// Define the endpoint URL
const BASE_URL = process.env.BACKEND_URL as string; // Replace with your backend domain
const ENDPOINT = `${BASE_URL}/admin/brand/update`;

// Function to edit brand details
export async function editBrand({
  brandId,
  name,
  email,
  password,
  description,
  image,
  postalCode,
  adminId,
}: {
  brandId: string;
  name?: string;
  email?: string;
  password?: string;
  description?: string;
  image?: string;
  postalCode?: string;
  adminId: string;
}): Promise<{ success: boolean; message: string }> {
  console.log("🚀 ~ adminId:", adminId);
  try {
    // Make a PUT request to the backend endpoint
    const response = await axios.put(ENDPOINT, {
      brandId,
      name,
      email,
      password,
      description,
      image,
      postalCode,
      adminId,
    });

    // Check the response and return success or error
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message || "Brand updated successfully.",
      };
    } else {
      return {
        success: false,
        message: response.data.message || "Failed to update brand.",
      };
    }
  } catch (error: ErrorType | unknown) {
    const err = error as ErrorType;
    console.error("Error updating brand:", err?.response?.data || err?.message);
    return {
      success: false,
      message:
        err?.response?.data?.message ||
        "An error occurred while updating the brand.",
    };
  }
}
