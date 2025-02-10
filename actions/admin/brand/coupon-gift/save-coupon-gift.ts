// "use server";

// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/config/firebase";

// export async function saveCouponGift(
//   couponData: Omit<
//     {
//       name: string;
//       code: string;
//       discount: string; // Discount remains as a string
//       image?: string;
//       brandId: string;
//       startDate: string;
//       endDate: string;
//       usageLimit: number;
//     },
//     "id"
//   >
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     console.log("Received couponData for save:", couponData);

//     if (!couponData.image) {
//       return {
//         success: false,
//         message: "Image is Required ",
//       };
//     }
//     // Validate required fields
//     if (!couponData.name || !couponData.code || !couponData.brandId) {
//       throw new Error("Name, Code, and Brand ID are required.");
//     }

//     const discountValue = Number(couponData.discount);
//     if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
//       throw new Error("Discount must be a valid number between 1 and 100.");
//     }

//     const startDate = new Date(couponData.startDate);
//     const endDate = new Date(couponData.endDate);
//     if (startDate > endDate) {
//       throw new Error("Start Date cannot be after End Date.");
//     }

//     // Reference the 'couponGifts' collection in Firestore
//     const couponsCollection = collection(db, "couponGifts");

//     // Add the new coupon document
//     await addDoc(couponsCollection, {
//       ...couponData,
//       discount: discountValue.toString(), // Store discount as a string
//       createdAt: new Date().toISOString(),
//     });

//     return {
//       success: true,
//       message: "Coupon created successfully.",
//     };
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error saving coupon gift:", error.message);
//     } else {
//       console.error("Error saving coupon gift:", error);
//     }
//     return {
//       success: false,
//       message:
//         (error as Error).message ||
//         "An error occurred while saving the coupon.",
//     };
//   }
// }

/////////////////////////////////////////////////////////////////////////////

"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

// Define Coupon Data Type
type CouponData = {
  name: string;
  code: string;
  discount: string;
  image?: string;
  brandId: string;
  startDate: string;
  endDate: string;
  usageLimit: number;
};

// Function to Save Coupon Gift
export async function saveCouponGift(
  couponData: Omit<CouponData, "id">
): Promise<{ success: boolean; message: string }> {
  try {
    console.log("[saveCouponGift] Received:", couponData);

    // Validate required fields
    const {
      name,
      code,
      discount,
      image,
      brandId,
      startDate,
      endDate,
      usageLimit,
    } = couponData;

    if (!name || !code || !brandId) {
      return {
        success: false,
        message: "Name, Code, and Brand ID are required.",
      };
    }

    // if (!image) {
    //   return { success: false, message: "Image is required." };
    // }

    if (!startDate || !endDate) {
      return { success: false, message: "Start and End Dates are required." };
    }

    if (!usageLimit || usageLimit <= 0) {
      return {
        success: false,
        message: "Usage limit must be a positive number.",
      };
    }

    // Validate Discount
    const discountValue = Number(discount);
    if (isNaN(discountValue) || discountValue <= 0 || discountValue > 100) {
      return {
        success: false,
        message: "Discount must be a valid number between 1 and 100.",
      };
    }

    // Validate Dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (
      parsedStartDate.toString() === "Invalid Date" ||
      parsedEndDate.toString() === "Invalid Date"
    ) {
      return { success: false, message: "Invalid date format." };
    }

    if (parsedStartDate > parsedEndDate) {
      return {
        success: false,
        message: "Start Date cannot be after End Date.",
      };
    }

    // Firestore Reference
    const couponsCollection = collection(db, "couponGifts");

    // Add to Firestore
    await addDoc(couponsCollection, {
      ...couponData,
      discount: discountValue.toString(), // Store discount as a string
      // startDate: parsedStartDate.toISOString(),
      // endDate: parsedEndDate.toISOString(),
      createdAt: new Date().toISOString(),
    });

    console.log("[saveCouponGift] Coupon successfully saved.");
    return { success: true, message: "Coupon created successfully." };
  } catch (error) {
    console.error("[saveCouponGift] Error:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    };
  }
}
