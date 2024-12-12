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

// Create a new store user
export async function createStoreUser(
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

    // Prepare store user data
    const storeUserData = {
      uid: userId,
      email,
      name,
      role: "store",
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
    };

    // Save store user data in Firestore
    const userDoc = doc(collection(db, "users"), userId);
    await setDoc(userDoc, storeUserData);

    return { success: "Store user created successfully!" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating store user:", error.message);
      return { success: "", error: error.message };
    }
    return { success: "", error: "An unknown error occurred" };
  }
}
