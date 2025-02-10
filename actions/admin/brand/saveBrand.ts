"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
// import bwipjs from "bwip-js"; // Install bwip-js for barcode generation
import { db } from "@/config/firebase";
import QRCode from "qrcode";
import sharp from "sharp";

// Function to hash passwords using SHA-256 with salt
const hashPassword = (password: string, salt: string): string => {
  const saltedPassword = password + salt;
  return crypto.createHash("sha256").update(saltedPassword).digest("hex");
};

// Function to generate a barcode as a Base64 string
// const generateBarcode = async (data: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     bwipjs.toBuffer(
//       {
//         bcid: "code128", // Barcode type
//         text: data, // Data to encode
//         scale: 3, // Scale factor
//         height: 10, // Bar height, in millimeters
//         includetext: true, // Include human-readable text
//         textxalign: "center", // Align text
//       },
//       (err, png) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(`data:image/png;base64,${png.toString("base64")}`);
//         }
//       }
//     );
//   });
// };

// Function to generate a QR code as a Base64 string
const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data); // Generate a QR Code as a Base64 string
  } catch (error) {
    console.log("🚀 ~ generateQRCode ~ error:", error);
    return "";
  }
};

// Action to save a brand
export async function saveBrand(brandData: {
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  adminId: string;
  postalCode: string;
}): Promise<{ success: boolean; message: string }> {
  console.log("🚀 ~ brandData in Save Brand ------ >", brandData);
  try {
    const { name, email, password, description, image, adminId, postalCode } =
      brandData;

    if (!image) {
      return {
        success: false,
        message: "Image is required.",
      };
    }
    let compressedImage: string | undefined;
    // Compress the image using Sharp
    const buffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const compressedBuffer = await sharp(buffer)
      .resize(300) // Resize to a width of 300px while maintaining aspect ratio
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();

    compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
      "base64"
    )}`;

    // Initialize Firebase Auth and create user
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const brandId = userCredential.user.uid;

    // Generate a salt and hash the password
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(password, salt);

    // Generate a barcode for the brand
    // const barcode = await generateBarcode(brandId);
    // const barcode = await generateBarcode(name); // we have to generate brandcode with brand Name .

    const qrCode = await generateQRCode(name);
    // Prepare brand data to be saved in Firestore
    const brandDoc = {
      name,
      email,
      description,
      // image,
      compressedImage,
      adminId,
      hashedPassword, // Save hashed password
      salt, // Save salt for validation
      createdAt: new Date().toISOString(),
      type: "brand", // Type field for brand login
      postalCode,
      // barcode, // Add barcode to the document
      qrCode, // Add QR code to the document
    };

    // Save brand data to Firestore
    const brandRef = doc(collection(db, "brands"), brandId);
    await setDoc(brandRef, brandDoc);

    return {
      success: true,
      message: `Brand '${name}' has been successfully created with login credentials.`,
    };
  } catch (error) {
    console.error("Error creating brand:", error);
    let message = "An error occurred while creating the brand.";

    // @ts-expect-error ignore
    if (error.code) {
      // @ts-expect-error ignore
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "The email address is already in use by another account.";
          break;
        case "auth/invalid-email":
          message = "The email address is not valid.";
          break;
        case "auth/weak-password":
          message =
            "The password is too weak. Please choose a stronger password.";
          break;
        case "auth/operation-not-allowed":
          message =
            "Email/password accounts are not enabled. Please contact support.";
          break;
        default:
          message = "An unknown error occurred. Please try again later.";
      }
    }

    return {
      success: false,
      message,
    };
  }
}
