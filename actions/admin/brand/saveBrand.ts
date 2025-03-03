// "use server";

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, setDoc } from "firebase/firestore";
// import crypto from "crypto";
// import { db } from "@/config/firebase";
// import QRCode from "qrcode";
// import sharp from "sharp";

// // Function to hash passwords using SHA-256 with salt
// const hashPassword = (password: string, salt: string): string => {
//   const saltedPassword = password + salt;
//   return crypto.createHash("sha256").update(saltedPassword).digest("hex");
// };

// // Function to generate a QR code as a Base64 string
// const generateQRCode = async (data: string): Promise<string> => {
//   try {
//     return await QRCode.toDataURL(data); // Generate a QR Code as a Base64 string
//   } catch (error) {
//     console.log("🚀 ~ generateQRCode ~ error:", error);
//     return "";
//   }
// };

// // Action to save a brand
// export async function saveBrand(brandData: {
//   name: string;
//   email: string;
//   password: string;
//   description: string;
//   image: string;
//   adminId: string;
//   postalCode: string;
// }): Promise<{ success: boolean; message: string }> {
//   console.log("🚀 ~ brandData in Save Brand ------ >", brandData);
//   try {
//     const { name, email, password, description, image, adminId, postalCode } =
//       brandData;

//     if (!image) {
//       return {
//         success: false,
//         message: "Image is required.",
//       };
//     }
//     let compressedImage: string | undefined;
//     // Compress the image using Sharp
//     const buffer = Buffer.from(
//       image.replace(/^data:image\/\w+;base64,/, ""),
//       "base64"
//     );

//     const compressedBuffer = await sharp(buffer)
//       .resize(300) // Resize to a width of 300px while maintaining aspect ratio
//       .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
//       .toBuffer();

//     compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
//       "base64"
//     )}`;

//     // Initialize Firebase Auth and create user
//     const auth = getAuth();
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const brandId = userCredential.user.uid;

//     // Generate a salt and hash the password
//     const salt = crypto.randomBytes(16).toString("hex");
//     const hashedPassword = hashPassword(password, salt);

//     // Generate a barcode for the brand
//     // const barcode = await generateBarcode(brandId);
//     // const barcode = await generateBarcode(name); // we have to generate brandcode with brand Name .

//     const qrCode = await generateQRCode(name);
//     // Prepare brand data to be saved in Firestore
//     const brandDoc = {
//       name,
//       email,
//       description,
//       // image,
//       compressedImage,
//       adminId,
//       hashedPassword, // Save hashed password
//       salt, // Save salt for validation
//       createdAt: new Date().toISOString(),
//       type: "brand", // Type field for brand login
//       postalCode,
//       // barcode, // Add barcode to the document
//       qrCode, // Add QR code to the document
//     };

//     // Save brand data to Firestore
//     const brandRef = doc(collection(db, "brands"), brandId);
//     await setDoc(brandRef, brandDoc);

//     return {
//       success: true,
//       message: `Brand '${name}' has been successfully created with login credentials.`,
//     };
//   } catch (error) {
//     console.error("Error creating brand:", error);
//     let message = "An error occurred while creating the brand.";

//     // @ts-expect-error ignore
//     if (error.code) {
//       // @ts-expect-error ignore
//       switch (error.code) {
//         case "auth/email-already-in-use":
//           message = "The email address is already in use by another account.";
//           break;
//         case "auth/invalid-email":
//           message = "The email address is not valid.";
//           break;
//         case "auth/weak-password":
//           message =
//             "The password is too weak. Please choose a stronger password.";
//           break;
//         case "auth/operation-not-allowed":
//           message =
//             "Email/password accounts are not enabled. Please contact support.";
//           break;
//         default:
//           message = "An unknown error occurred. Please try again later.";
//       }
//     }

//     return {
//       success: false,
//       message,
//     };
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

"use server";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import crypto from "crypto";
import nodemailer from "nodemailer"; // Import Nodemailer
import { db } from "@/config/firebase";
import QRCode from "qrcode";
import sharp from "sharp";

// Function to hash passwords using SHA-256 with salt
const hashPassword = (password: string, salt: string): string => {
  const saltedPassword = password + salt;
  return crypto.createHash("sha256").update(saltedPassword).digest("hex");
};

// Function to generate a QR code as a Base64 string
const generateQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data); // Generate a QR Code as a Base64 string
  } catch (error) {
    console.log("🚀 ~ generateQRCode ~ error:", error);
    return "";
  }
};

// Function to send an email with login credentials
const sendBrandEmail = async (
  brandEmail: string,
  brandName: string,
  password: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use any SMTP provider (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Store in .env file
        pass: process.env.EMAIL_PASS, // Store in .env file
      },
    });

    const mailOptions = {
      from: `"Your Company" <${process.env.EMAIL_USER}>`,
      to: brandEmail,
      subject: "Welcome to Our Platform - Brand Account Created",
      html: `
        <h2>Welcome, ${brandName}!</h2>
        <p>Your brand account has been successfully created.</p>
        <p><strong>Email:</strong> ${brandEmail}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>You can now log in and manage your brand.</p>
        <p>Thank you for joining us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${brandEmail}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

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

    if (!image) {
      return {
        success: false,
        message: "Image is required.",
      };
    }

    let compressedImage: string | undefined;
    const buffer = Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const compressedBuffer = await sharp(buffer)
      .resize(300)
      .jpeg({ quality: 80 })
      .toBuffer();

    compressedImage = `data:image/jpeg;base64,${compressedBuffer.toString(
      "base64"
    )}`;

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

    const qrCode = await generateQRCode(name);

    const brandDoc = {
      name,
      email,
      description,
      compressedImage,
      adminId,
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
      type: "brand",
      postalCode,
      qrCode,
    };

    const brandRef = doc(collection(db, "brands"), brandId);
    await setDoc(brandRef, brandDoc);

    // Send Email with Credentials
    await sendBrandEmail(email, name, password);

    return {
      success: true,
      message: `Brand '${name}' has been successfully created, and an email has been sent.`,
    };
  } catch (error) {
    console.error("Error creating brand:", error);
    let message = "An error occurred while creating the brand.";

    if ((error as any).code) {
      switch ((error as any).code) {
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
