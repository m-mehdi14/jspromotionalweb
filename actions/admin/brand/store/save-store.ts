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
    };

    // Save store data to Firestore under the stores collection
    const storeRef = doc(collection(db, "stores"), storeId);
    await setDoc(storeRef, storeDoc);

    return {
      success: true,
      message: `Store '${name}' has been successfully created and associated with the brand.`,
    };
  } catch (error: FirebaseError | unknown) {
    const err = error as FirebaseError;
    console.error("Error creating store:", err);
    let errorMessage = "An error occurred while creating the store.";
    if (err.code === "auth/email-already-in-use") {
      errorMessage = "The email address is already in use.";
    } else if (err.code === "auth/weak-password") {
      errorMessage = "The password is too weak.";
    }
    return {
      success: false,
      message: errorMessage,
    };
  }
}
