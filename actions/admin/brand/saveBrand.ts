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

interface FirebaseError {
  code?: string;
  message: string;
  response?: {
    data: {
      message?: string;
    };
  };
}

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

    // Prepare brand data to be saved in Firestore
    const brandDoc = {
      name,
      email,
      description,
      image,
      adminId,
      hashedPassword, // Save hashed password
      salt, // Save salt for validation
      createdAt: new Date().toISOString(),
      type: "brand", // type brand for when brand is try to login, so this type field will help there
      postalCode,
    };

    // Save brand data to Firestore
    const brandRef = doc(collection(db, "brands"), brandId);
    await setDoc(brandRef, brandDoc);

    return {
      success: true,
      message: `Brand '${name}' has been successfully created with login credentials.`,
    };
  } catch (error: FirebaseError | unknown) {
    const err = error as FirebaseError;
    console.error("Error creating brand:", err);

    let message = "An error occurred while creating the brand.";
    if (err.code) {
      switch (err.code) {
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
