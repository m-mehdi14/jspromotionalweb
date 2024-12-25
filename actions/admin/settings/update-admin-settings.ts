"use server";

import axios from "axios";

export async function updateAdminPassword(
  adminId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/settings/password`,
      { adminId, currentPassword, newPassword }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Password updated successfully.",
      };
    }

    return { success: false, message: "Failed to update password." };
  } catch (error) {
    console.error("Error updating admin password:", error);
    return {
      success: false,
      message: "An error occurred while updating password.",
    };
  }
}
