// /////////////////////////////////////////////////////////////////////////

// "use server";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, setDoc } from "firebase/firestore";
// import crypto from "crypto";
// import { db } from "@/config/firebase";
// import { FirebaseError } from "firebase/app";
// import QRCode from "qrcode";

// // Define Store Data Type
// type StoreData = {
//   name: string;
//   email: string;
//   password: string;
//   description: string;
//   image: string;
//   brandId: string;
//   postalCode: string;
// };

// // Hash password with SHA-256 and salt
// const hashPassword = (password: string, salt: string): string => {
//   return crypto
//     .createHash("sha256")
//     .update(password + salt)
//     .digest("hex");
// };

// // Generate a QR Code as a Base64 string
// const generateQRCode = async (data: string): Promise<string> => {
//   try {
//     return await QRCode.toDataURL(data);
//   } catch (error) {
//     console.error("[generateQRCode] Failed to generate QR Code:", error);
//     return "";
//   }
// };

// // Server Action to Save Store
// export async function saveStore(
//   storeData: StoreData
// ): Promise<{ success: boolean; message: string }> {
//   console.log("🚀 [saveStore] Received store data:", storeData);

//   try {
//     const { name, email, password, description, image, brandId, postalCode } =
//       storeData;

//     // Basic Validations
//     if (!image) return { success: false, message: "Image is required." };
//     if (!name || !email || !password)
//       return {
//         success: false,
//         message: "Name, Email, and Password are required.",
//       };
//     if (!brandId) return { success: false, message: "Brand ID is required." };
//     if (password.length < 6)
//       return {
//         success: false,
//         message: "Password must be at least 6 characters long.",
//       };

//     // Firebase Auth - Initialize and Create User
//     const auth = getAuth();
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const storeId = userCredential.user.uid;

//     // Secure Password Storage
//     const salt = crypto.randomBytes(16).toString("hex");
//     const hashedPassword = hashPassword(password, salt);

//     // Generate QR Code
//     const qrCode = await generateQRCode(name);

//     // Prepare Firestore Document
//     const storeDoc = {
//       name,
//       email,
//       description,
//       image,
//       brandId,
//       hashedPassword, // Store hashed password
//       salt, // Store salt for password verification
//       createdAt: new Date().toISOString(),
//       type: "store",
//       postalCode,
//       qrCode, // Add QR Code to Firestore
//     };

//     // Firestore - Save Store Data
//     const storeRef = doc(collection(db, "stores"), storeId);
//     await setDoc(storeRef, storeDoc, { merge: true }); // Use merge to prevent overwrites

//     console.log("✅ [saveStore] Store successfully created:", name);
//     return {
//       success: true,
//       message: `Store '${name}' has been successfully created and associated with the brand.`,
//     };
//   } catch (error) {
//     console.error("❌ [saveStore] Error creating store:", error);

//     let errorMessage = "An error occurred while creating the store.";
//     if (error instanceof FirebaseError) {
//       switch (error.code) {
//         case "auth/email-already-in-use":
//           errorMessage = "The email address is already in use.";
//           break;
//         case "auth/weak-password":
//           errorMessage = "The password is too weak.";
//           break;
//       }
//     }

//     return { success: false, message: errorMessage };
//   }
// }

////////////////////////////////////////////////////////////////////////////////////////////

"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
import nodemailer from "nodemailer"; // Import Nodemailer
import { db } from "@/config/firebase";
import { FirebaseError } from "firebase/app";
import QRCode from "qrcode";

// Define Store Data Type
type StoreData = {
  name: string;
  email: string;
  password: string;
  description: string;
  image: string;
  brandId: string;
  postalCode: string;
};

// Hash password with SHA-256 and salt
const hashPassword = (password: string, salt: string): string => {
  return crypto
    .createHash("sha256")
    .update(password + salt)
    .digest("hex");
};

// Generate a QR Code as a Base64 string
const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error("[generateQRCode] Failed to generate QR Code:", error);
    return "";
  }
};

// Function to send an email with login credentials
const sendStoreEmail = async (
  storeEmail: string,
  storeName: string,
  password: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Change to your SMTP provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password (use app password for Gmail)
      },
    });

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: storeEmail,
      subject: "Welcome to Our Platform - Store Account Created",
      html: `
        <h2>Welcome, ${storeName}!</h2>
        <p>Your store account has been successfully created.</p>
        <p><strong>Email:</strong> ${storeEmail}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can now log in and start managing your store.</p>
        <p>Thank you for joining us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${storeEmail}`);
    // this is works for both admin and store
  } catch (error) {
    console.error("❌ [sendStoreEmail] Error sending email:", error);
  }
};

// Server Action to Save Store
export async function saveStore(
  storeData: StoreData
): Promise<{ success: boolean; message: string }> {
  console.log("🚀 [saveStore] Received store data:", storeData);

  try {
    const { name, email, password, description, image, brandId, postalCode } =
      storeData;

    // Basic Validations
    if (!image) return { success: false, message: "Image is required." };
    if (!name || !email || !password)
      return {
        success: false,
        message: "Name, Email, and Password are required.",
      };
    if (!brandId) return { success: false, message: "Brand ID is required." };
    if (password.length < 6)
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      };

    // Firebase Auth - Initialize and Create User
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const storeId = userCredential.user.uid;

    // Secure Password Storage
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(password, salt);

    // Generate QR Code
    const qrCode = await generateQRCode(name);

    // Prepare Firestore Document
    const storeDoc = {
      name,
      email,
      description,
      image,
      brandId,
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
      type: "store",
      postalCode,
      qrCode, // Add QR Code to Firestore
    };

    // Firestore - Save Store Data
    const storeRef = doc(collection(db, "stores"), storeId);
    await setDoc(storeRef, storeDoc, { merge: true });

    // Send Email with Store Credentials
    await sendStoreEmail(email, name, password);

    console.log("✅ [saveStore] Store successfully created:", name);
    return {
      success: true,
      message: `Store '${name}' has been successfully created, and an email has been sent.`,
    };
  } catch (error) {
    console.error("❌ [saveStore] Error creating store:", error);

    let errorMessage = "An error occurred while creating the store.";
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "The email address is already in use.";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          break;
      }
    }

    return { success: false, message: errorMessage };
  }
}
