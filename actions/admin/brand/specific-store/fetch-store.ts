"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Store } from "@/app/(admin)/admin/brand/[id]/admin-store/[storeId]/_components/type";

interface FetchStoreResponse {
  success: boolean;
  data?: Store;
  message?: string;
}

export async function fetchStoreDetails(
  brandId: string,
  storeId: string
): Promise<FetchStoreResponse> {
  // Validate inputs
  if (!brandId || !storeId) {
    return {
      success: false,
      message: "Both Brand ID and Store ID are required.",
    };
  }

  try {
    // Reference the store document
    const storeDocRef = doc(db, "stores", storeId);

    // Fetch the document
    const storeDoc = await getDoc(storeDocRef);

    // Check if the document exists
    if (!storeDoc.exists()) {
      return {
        success: false,
        message: `Store with ID '${storeId}' not found.`,
      };
    }

    const storeData = storeDoc.data();

    // Check if store data is valid
    if (!storeData) {
      return {
        success: false,
        message: "Store data is empty or undefined.",
      };
    }

    // Construct the store object
    const store: Store = {
      id: storeDoc.id,
      ...storeData,
    };

    return {
      success: true,
      data: store,
    };
  } catch (error: unknown) {
    console.error(
      `Error fetching store details for Brand ID '${brandId}' and Store ID '${storeId}':`,
      error
    );
    return {
      success: false,
      message: "An error occurred while fetching store details.",
    };
  }
}
