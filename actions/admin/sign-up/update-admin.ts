"use server";

interface UpdateAdminResponse {
  success: boolean;
  message: string;
}

interface AdminUpdates {
  [key: string]: string | number | boolean;
}

export const updateAdmin = async (
  adminId: string,
  updates: AdminUpdates
): Promise<UpdateAdminResponse> => {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/admin/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminId, ...updates }),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: data.message || "Admin updated successfully.",
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to update admin.",
      };
    }
  } catch (error) {
    console.error("Error in updateAdmin function:", error);
    return {
      success: false,
      message:
        "An error occurred while updating the admin. Please try again later.",
    };
  }
};
