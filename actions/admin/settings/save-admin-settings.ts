"use server";

import axios from "axios";
import sharp from "sharp";

export async function saveAdminSettings(
  adminId: string,
  settings: {
    name: string;
    email: string;
    image: string; // base64 string of the image
  }
): Promise<{ success: boolean; message: string }> {
  try {
    let compressedImage: string | undefined;

    if (settings.image) {
      // Compress the image using Sharp
      const buffer = Buffer.from(
        settings.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      const compressedBuffer = await sharp(buffer)
        .resize(300) // Resize to a width of 300px while maintaining aspect ratio
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();

      compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
        "base64"
      )}`;
    }

    // Update the settings object with the compressed image
    const updatedSettings = {
      ...settings,
      image: compressedImage || settings.image,
    };

    // Make the request to the backend
    const response = await axios.put<{ message: string }>(
      `${process.env.BACKEND_URL}/admin/settings`,
      { adminId, ...updatedSettings }
    );

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message || "Settings updated successfully.",
      };
    }

    return { success: false, message: "Failed to update settings." };
  } catch (error) {
    console.error("Error saving admin settings:", error);
    return {
      success: false,
      message: "An error occurred while updating settings.",
    };
  }
}
