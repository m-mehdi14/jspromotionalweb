"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
// import bwipjs from "bwip-js"; // Import the barcode generation library
import { db } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import QRCode from "qrcode"; // Import the QR Code generation library
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
    console.error("Failed to generate QR Code", error);
    return "";
  }
};

// Server Action to save a store
export async function saveStore(storeData: {
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  brandId: string; // Relation to a specific brand
  postalCode: string;
}): Promise<{ success: boolean; message: string }> {
  console.log("🚀 ~ storeData in Save Store ------ >", storeData);
  try {
    const { name, email, password, description, image, brandId, postalCode } =
      storeData;

    // Initialize Firebase Auth and create user
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const storeId = userCredential.user.uid;

    // Generate a salt and hash the password
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(password, salt);

    // Generate a barcode for the store
    // const barcode = await generateBarcode(storeId);
    // const barcode = await generateBarcode(name);

    // Generate a QR code for the store
    const qrCode = await generateQRCode(name);

    // Prepare store data to be saved in Firestore
    const storeDoc = {
      name,
      email,
      description,
      image,
      brandId, // Associate with the specific brand
      hashedPassword, // Save hashed password
      salt, // Save salt for validation
      createdAt: new Date().toISOString(),
      type: "store", // Type 'store' for store-specific logic
      postalCode,
      // barcode, // Add barcode to the store document
      qrCode, // Add QR code to the store document
    };

    // Save store data to Firestore under the stores collection
    const storeRef = doc(collection(db, "stores"), storeId);
    await setDoc(storeRef, storeDoc);

    return {
      success: true,
      message: `Store '${name}' has been successfully created and associated with the brand.`,
    };
  } catch (error) {
    console.error("Error creating store:", error);
    let errorMessage = "An error occurred while creating the store.";
    if ((error as FirebaseError).code === "auth/email-already-in-use") {
      errorMessage = "The email address is already in use.";
    } else if ((error as FirebaseError).code === "auth/weak-password") {
      errorMessage = "The password is too weak.";
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
