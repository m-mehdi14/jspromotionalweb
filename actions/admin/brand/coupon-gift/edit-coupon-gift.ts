"use server";

import axios, { AxiosError } from "axios";
import sharp from "sharp";

// Function to extract image format from Base64 string
function getBase64ImageFormat(base64Image: string): string | null {
  const matches = base64Image.match(/^data:image\/(\w+);base64,/);
  return matches ? matches[1].toLowerCase() : null;
}

// Compress and convert base64 string to smaller size
async function compressBase64Image(base64Image: string): Promise<string> {
  const format = getBase64ImageFormat(base64Image);

  if (!format || !["jpeg", "jpg", "png", "webp"].includes(format)) {
    throw new Error(
      "Unsupported image format. Only JPEG, PNG, and WebP are allowed."
    );
  }

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove metadata
  const buffer = Buffer.from(base64Data, "base64");

  const compressedBuffer = await sharp(buffer)
    .resize({ width: 500 }) // Resize image to 500px width
    .toFormat("jpeg") // Convert to JPEG for consistency
    .jpeg({ quality: 70 }) // Compress to 70% quality
    .toBuffer();

  return `data:image/jpeg;base64,${compressedBuffer.toString("base64")}`;
}

export async function editCouponGift(
  couponId: string,
  updatedData: Partial<{
    name: string;
    code: string;
    discount: string;
    image?: string;
    startDate?: string;
    endDate?: string;
    usageLimit?: number;
  }>
): Promise<{ success: boolean; message: string }> {
  try {
    // Validate inputs
    if (!couponId) {
      return { success: false, message: "Coupon ID is required." };
    }

    if (Object.keys(updatedData).length === 0) {
      return { success: false, message: "No data provided for update." };
    }

    let compressedImage: string | undefined;

    // If an image is provided, compress it using the helper function
    if (updatedData.image) {
      compressedImage = await compressBase64Image(updatedData.image);
    }

    // Add updatedAt timestamp and replace image with compressedImage
    const payload = {
      ...updatedData,
      image: compressedImage || updatedData.image, // Use compressed image if provided
      updatedAt: new Date().toISOString(),
    };

    // Make a PUT request to the backend endpoint
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/coupon-gifts/edit`,
      { couponId, ...payload }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Coupon updated successfully.",
      };
    }

    return { success: false, message: "Failed to update coupon." };
  } catch (error: unknown) {
    console.error("Error updating coupon gift:", error);

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
        success: false,
        message:
          axiosError.response?.data?.message ||
          "An error occurred while updating the coupon.",
      };
    }

    return {
      success: false,
      message: "An unknown error occurred.",
    };
  }
}
