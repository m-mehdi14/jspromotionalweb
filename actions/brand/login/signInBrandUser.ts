import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, app } from "@/config/firebase";
import crypto from "crypto";

// Validate password function
const validatePassword = (
  inputPassword: string,
  storedHash: string,
  storedSalt: string
): boolean => {
  const hash = crypto
    .createHash("sha256")
    .update(inputPassword + storedSalt)
    .digest("hex");
  return hash === storedHash;
};

// Authenticate a brand user
export async function signInBrandUser(
  email: string,
  password: string
): Promise<{ success: string; error?: string }> {
  const auth = getAuth(app);

  try {
    // Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;

    // Fetch user data from Firestore
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return { success: "", error: "User not found in Firestore." };
    }

    const userData = userDoc.data();

    // Ensure the user is a brand
    if (userData.role !== "brand") {
      return { success: "", error: "User is not authorized as a brand." };
    }

    // Validate hashed password
    const isPasswordValid = validatePassword(
      password,
      userData.hashedPassword,
      userData.salt
    );

    if (!isPasswordValid) {
      return { success: "", error: "Invalid password." };
    }

    return { success: "Logged in successfully!" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
      return { success: "", error: "Authentication failed. Please try again." };
    }
    return { success: "", error: "An unknown error occurred." };
  }
}
