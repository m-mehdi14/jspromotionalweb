"use server";

import { addDoc, collection } from "firebase/firestore";
import sharp from "sharp";
import { Flyer } from "@/app/(admin)/admin/brand/[id]/admin-store/_components/types";
import { db } from "@/config/firebase";

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

// Save a flyer to Firestore
export async function saveFlyer(
  flyerData: Omit<Flyer, "id">
): Promise<{ success: boolean; message: string; data?: Flyer }> {
  console.log("🚀 ~ Flyer Data:", flyerData);

  try {
    if (!flyerData.brandId) {
      return {
        success: false,
        message: "Brand ID is required.",
      };
    }

    if (!flyerData.image) {
      return {
        success: false,
        message: "Image is required.",
      };
    }

    let compressedImage = flyerData.image;

    // Compress the image if it exists
    if (compressedImage) {
      compressedImage = await compressBase64Image(flyerData.image as string);
    }

    // Reference the "flyers" collection
    const flyersCollection = collection(db, "flyers");

    // Prepare flyer data for saving
    const flyerDoc = {
      ...flyerData,
      image: compressedImage, // Store the compressed base64 image
      createdAt: new Date().toISOString(),
    };

    // Add the flyer data to the collection
    const docRef = await addDoc(flyersCollection, flyerDoc);

    // Return a success response with the newly saved flyer data
    return {
      success: true,
      message: "Flyer has been successfully saved.",
      data: { id: docRef.id, ...flyerDoc },
    };
  } catch (error) {
    console.error("Error saving flyer:", error);

    let errorMessage = "Failed to save the flyer. Please try again.";
    if (error instanceof Error) {
      if (error.message.includes("Unsupported image format")) {
        errorMessage = error.message;
      } else if (error.message.includes("Brand ID is required")) {
        errorMessage = error.message;
      }
    }

    // Return an error response
    return {
      success: false,
      message: errorMessage,
    };
  }
}
