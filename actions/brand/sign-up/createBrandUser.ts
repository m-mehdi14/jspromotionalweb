"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { db, app } from "@/config/firebase";
import crypto from "crypto";

// Hash password function
const hashPassword = (password: string, salt: string): string => {
  const saltedPassword = password + salt;
  return crypto.createHash("sha256").update(saltedPassword).digest("hex");
};

// Create a new brand user
export async function createBrandUser(
  email: string,
  password: string,
  name: string
): Promise<{ success: string; error?: string }> {
  try {
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

    // Prepare brand user data
    const brandUserData = {
      uid: userId,
      email,
      name,
      role: "brand",
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
    };

    // Save brand user data in Firestore
    const userDoc = doc(collection(db, "users"), userId);
    await setDoc(userDoc, brandUserData);

    return { success: "Brand user created successfully!" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating brand user:", error.message);
      return { success: "", error: error.message };
    }
    return { success: "", error: "An unknown error occurred" };
  }
}
