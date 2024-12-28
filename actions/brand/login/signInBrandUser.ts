import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, app } from "@/config/firebase";
import crypto from "crypto";

interface BrandUserData {
  email: string;
  hashedPassword: string;
  salt: string;
  type: string;
  name: string;
  role: string;
}

// Function to validate if the user is a brand
const validateBrandUser = async (
  email: string
): Promise<{
  isValid: boolean;
  userData?: BrandUserData;
  error?: string;
}> => {
  try {
    const brandsRef = collection(db, "brands");
    const q = query(
      brandsRef,
      where("email", "==", email),
      where("type", "==", "brand")
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        isValid: false,
        error: "User not found or not authorized as a brand.",
      };
    }

    // Assuming one result due to unique email constraint
    const userData = querySnapshot.docs[0].data() as BrandUserData;
    console.log("🚀 ~ validateBrandUser ~ userData:", userData);

    return { isValid: true, userData };
  } catch (error) {
    console.error("Error validating brand user:", error);
    return {
      isValid: false,
      error: "Error during user validation.",
    };
  }
};

// Function to validate password
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

// Function to sign in a brand user
export async function signInBrandUser(
  email: string,
  password: string
): Promise<{ success: boolean; message: string; id: string }> {
  const auth = getAuth(app);

  try {
    // Step 1: Validate the user as a brand
    const { isValid, userData, error } = await validateBrandUser(email);

    if (!isValid || !userData) {
      return { success: false, message: error || "Validation failed.", id: "" };
    }

    // Step 2: Validate password
    const isPasswordValid = validatePassword(
      password,
      userData.hashedPassword,
      userData.salt
    );

    if (!isPasswordValid) {
      return { success: false, message: "Invalid password.", id: "" };
    }

    // Step 3: Authenticate user with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Authenticated User ID:", userCredential.user.uid);

    return {
      success: true,
      message: "Logged in successfully!",
      id: userCredential.user.uid,
    };
  } catch (error: unknown) {
    console.error("Error during sign-in:", error);

    if (error instanceof Error) {
      return { success: false, message: error.message, id: "" };
    }

    return { success: false, message: "An unknown error occurred.", id: "" };
  }
}
