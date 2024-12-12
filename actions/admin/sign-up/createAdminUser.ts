"use server";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
import { app, db } from "@/config/firebase";

// Function to hash passwords using SHA-256 with salt
const hashPassword = (password: string, salt: string): string => {
  const saltedPassword = password + salt;
  const hash = crypto.createHash("sha256").update(saltedPassword).digest("hex");
  return hash;
};

// Utility function to validate the provided password
// const validatePassword = (inputPassword: string, storedHash: string, storedSalt: string): boolean => {
//   const inputHash = hashPassword(inputPassword, storedSalt);
//   return inputHash === storedHash;
// };

// Function to create an admin user
export async function createAdminUser(
  email: string,
  password: string,
  name: string
): Promise<{ success: string; error?: string }> {
  try {
    // Initialize Firebase Auth
    const auth = getAuth(app);

    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    // Generate a salt for the password
    const salt = crypto.randomBytes(16).toString("hex");

    // Hash the password with the salt
    const hashedPassword = hashPassword(password, salt);

    // Prepare admin user data
    const adminUserData = {
      uid: userId,
      email,
      name,
      role: "admin",
      hashedPassword,
      salt, // Store the salt for future password validation
      createdAt: new Date().toISOString(),
    };

    // Save user data in Firestore
    const userDoc = doc(collection(db, "users"), userId);
    await setDoc(userDoc, adminUserData);

    return { success: "Admin User Created " };
  } catch (error: unknown) {
    // Handle unknown errors safely
    if (error instanceof Error) {
      console.error("Error creating admin user:", error.message);
      return { success: "", error: error.message };
    }
    console.error("Unknown error occurred:", error);
    return { success: "", error: "An unknown error occurred" };
  }
}
