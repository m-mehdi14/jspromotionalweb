"use server";

export async function deleteStore({
  brandId,
  storeId,
}: {
  brandId: string;
  storeId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    // Make a DELETE request to the API endpoint
    const response = await fetch(
      `${process.env.BACKEND_URL}/admin/store/delete`,
      {
        method: "DELETE",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({ brandId, storeId }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to delete the store.",
      };
    }

    return {
      success: true,
      message: result?.message || "Store successfully deleted.",
    };
  } catch (error) {
    console.error("Error deleting store:", error);
    return {
      success: false,
      message: "An error occurred while deleting the store.",
    };
  }
}
