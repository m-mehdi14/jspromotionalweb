import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, app } from "@/config/firebase";

// Authenticate a store user
export async function signInStoreUser(
  email: string,
  password: string
): Promise<{ success: string; error?: string }> {
  try {
    const auth = getAuth(app);

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

    // Ensure the user is a store
    if (userData.role !== "store") {
      return { success: "", error: "User is not authorized as a store." };
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
