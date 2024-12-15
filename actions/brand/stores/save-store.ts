"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
import { db } from "@/config/firebase";

// Function to hash passwords using SHA-256 with salt
const hashPassword = (password: string, salt: string): string => {
  const saltedPassword = password + salt;
  return crypto.createHash("sha256").update(saltedPassword).digest("hex");
};

// Action to save a store
export async function saveStore(storeData: {
  brandId: string;
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  postalCode: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const { brandId, name, email, password, description, image, postalCode } =
      storeData;

    // Initialize Firebase Auth and create a user for the store
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

    // Prepare store data to save in Firestore
    const storeDoc = {
      name,
      email,
      description,
      image,
      brandId, // Link the store to the brand
      hashedPassword, // Save hashed password
      salt, // Save salt for validation
      createdAt: new Date().toISOString(),
      type: "store", // Type 'store' for authentication logic
      postalCode,
    };

    // Save store data in Firestore under the brand
    const storeRef = doc(collection(db, "stores"), storeId);
    await setDoc(storeRef, storeDoc);

    return {
      success: true,
      message: `Store '${name}' has been successfully created and linked to the brand.`,
    };
  } catch (error) {
    console.error("Error saving store:", error);

    // Check for Firebase Authentication errors
    if (error.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "The email is already in use. Please use a different email.",
      };
    } else if (error.code === "auth/weak-password") {
      return {
        success: false,
        message: "The password is too weak. Please use a stronger password.",
      };
    }

    return {
      success: false,
      message: "An error occurred while saving the store.",
    };
  }
}
