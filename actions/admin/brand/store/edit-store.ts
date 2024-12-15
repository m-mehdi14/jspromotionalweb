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
  name?: string;
  email?: string;
  password?: string;
  description?: string;
  image?: string;
  postalCode?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.put(
      `${process.env.BACKEND_URL}/admin/store/edit`,
      {
        storeId, // Pass storeId correctly
        brandId,
        name,
        email,
        password,
        description,
        image,
        postalCode,
      }
    );

    return {
      success: true,
      message: response.data?.message || "Store successfully updated.",
    };
  } catch (error: ErrorType | unknown) {
    const err = error as ErrorType;
    console.error("Error updating store:", err);

    return {
      success: false,
      message:
        err?.response?.data?.message ||
        "An error occurred while updating the store.",
    };
  }
}
