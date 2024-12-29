"use server";

import axios from "axios";

interface DeleteAdminResponse {
  success: boolean;
  message: string;
}

export const deleteAdmin = async (
  adminId: string
): Promise<DeleteAdminResponse> => {
  try {
    const response = await axios.delete(
      `${process.env.BACKEND_URL}/admin/delete`,
      {
        data: { adminId },
      }
    );

    return {
      success: true,
      message: response.data.message || "Admin deleted successfully.",
    };
  } catch (error: unknown) {
    console.error("Error in deleteAdmin function:", error);

    if (axios.isAxiosError(error) && error.response && error.response.data) {
      // Return error message from server response
      return {
        success: false,
        message: error.response.data.message || "Failed to delete admin.",
      };
    }

    // Return a generic error message
    return {
      success: false,
      message:
        "An error occurred while deleting the admin. Please try again later.",
    };
  }
};
