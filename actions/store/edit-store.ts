/* eslint-disable @typescript-eslint/ban-ts-comment */
"use server";

import axios from "axios";

export async function editStoreDetails({
  storeId,
  name,
  email,
  description,
  postalCode,
  password,
}: {
  storeId: string;
  name: string;
  email: string;
  description: string;
  postalCode: string;
  password?: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // @ts-ignore
    const payload = {
      storeId,
      name,
      email,
      description,
      postalCode,
    };

    if (password) {
      // @ts-ignore
      payload.password = password; // Add password if it exists
    }

    // Replace this with your backend API endpoint logic
    const response = await axios.put(
      `${process.env.BACKEND_URL}/store/edit`,
      payload
    );

    return {
      success: response.data.success,
      message: response.data.message || "Store updated successfully",
    };
  } catch (error) {
    console.error("Error editing store details:", error);
    return {
      success: false,
      message: "An error occurred while updating store details.",
    };
  }
}
