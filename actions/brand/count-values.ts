"use server";

import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function fetchBrandsCount(): Promise<number> {
  try {
    const brandsCollection = collection(db, "brands");
    const snapshot = await getDocs(brandsCollection);
    return snapshot.size; // Return the total number of documents
  } catch (error) {
    console.error("Error fetching brands count:", error);
    return 0; // Return 0 if an error occurs
  }
}

export async function fetchCategoriesCount(): Promise<number> {
  try {
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);
    return snapshot.size; // Return the total number of documents
  } catch (error) {
    console.error("Error fetching categories count:", error);
    return 0;
  }
}

export async function fetchUsersCount(): Promise<number> {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching users count:", error);
    return 0;
  }
}

//  Brands

// Helper function to filter documents based on date range
const filterByDateRange = (docs: any[], startDate: string, endDate: string) => {
  return docs.filter((doc) => {
    const createdAt = doc.data().createdAt;

    if (createdAt && typeof createdAt === "string") {
      const createdAtDate = new Date(createdAt); // Convert ISO string to JavaScript Date
      const docDate = createdAtDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD from the date

      return docDate >= startDate && docDate <= endDate;
    }

    console.warn(
      "Skipping document due to invalid createdAt format:",
      doc.id,
      createdAt
    );
    return false; // Skip invalid documents
  });
};

// Generic function to fetch and filter documents by brandId and date range
const fetchCountByBrand = async (
  collectionName: string,
  brandId: string,
  startDate?: string,
  endDate?: string
): Promise<number> => {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    // Validate date range (if provided)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error("Invalid date format for startDate or endDate.");
      }

      if (start > end) {
        throw new Error("startDate cannot be greater than endDate.");
      }
    }

    const collectionRef = collection(db, collectionName);
    const collectionQuery = query(
      collectionRef,
      where("brandId", "==", brandId)
    );
    const snapshot = await getDocs(collectionQuery);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }
    console.log("🚀 ~ snapshot:", snapshot.size);

    return snapshot.size;
  } catch (error) {
    console.error(`Error fetching ${collectionName} count by brand ID:`, error);
    return 0;
  }
};

// Fetch stores count by brand ID
export async function fetchStoresCountByBrand(
  brandId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  return fetchCountByBrand("stores", brandId, startDate, endDate);
}

// Fetch special events count by brand ID
export async function fetchSpecialEventsCountByBrand(
  brandId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  return fetchCountByBrand("specialEvents", brandId, startDate, endDate);
}

// Fetch flyers count by brand ID
export async function fetchFlyersCountByBrand(
  brandId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  return fetchCountByBrand("flyers", brandId, startDate, endDate);
}

// Fetch coupon count by brand ID
export async function fetchCouponCountByBrand(
  brandId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  return fetchCountByBrand("couponGifts", brandId, startDate, endDate);
}

//////////////////////////////
/// Stores
/////////////////////////////////////////
// Helper function to filter documents based on date range

export async function fetchSpecialEventsCountByStore(
  storeId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const eventsCollection = collection(db, "specialEvents");
    const eventsQuery = query(
      eventsCollection,
      where("storeIds", "array-contains", storeId)
    );
    const snapshot = await getDocs(eventsQuery);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching special events count by store ID:", error);
    return 0;
  }
}

export async function fetchFlyersCountByStore(
  storeId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "storeFlyers");
    const flyersQuery = query(
      flyersCollection,
      where("storeIds", "array-contains", storeId)
    );
    const snapshot = await getDocs(flyersQuery);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}

export async function fetchCouponCountByStore(
  storeId: string,
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const couponsCollection = collection(db, "couponGifts");
    const couponsQuery = query(
      couponsCollection,
      where("storeId", "==", storeId)
    );
    const snapshot = await getDocs(couponsQuery);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching coupon count by store ID:", error);
    return 0;
  }
}
//////////////////////////////////////////

export async function BrandQRCode(email: string): Promise<number> {
  try {
    if (!email) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "brands");

    // Query to filter brands by brandId to get the QR code
    const brandQuery = query(flyersCollection, where("email", "==", email));
    const snapshot = await getDocs(brandQuery);

    if (snapshot.empty) {
      throw new Error("No QR code found for the given brand ID.");
    }

    // Assuming there's only one document per brandId
    const brandDoc = snapshot.docs[0];
    const qrCode = brandDoc.data().qrCode;

    if (!qrCode) {
      throw new Error("QR code not found in the document.");
    }

    // Return the QR code
    return qrCode;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}
export async function BrandCountView(email: string): Promise<number> {
  try {
    if (!email) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "brands");

    // Query to filter brands by brandId to get the QR code
    const brandQuery = query(flyersCollection, where("email", "==", email));
    const snapshot = await getDocs(brandQuery);

    if (snapshot.empty) {
      throw new Error("No QR code found for the given brand ID.");
    }

    // Assuming there's only one document per brandId
    const brandDoc = snapshot.docs[0];
    const count = brandDoc.data()?.countView;

    if (!count) {
      throw new Error("QR code not found in the document.");
    }

    // Return the QR code
    return count;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}

/////////////////////////////////////////////////

export async function StoreQRCode(email: string): Promise<number> {
  try {
    if (!email) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "stores");

    // Query to filter brands by brandId to get the QR code
    const brandQuery = query(flyersCollection, where("email", "==", email));
    const snapshot = await getDocs(brandQuery);

    if (snapshot.empty) {
      throw new Error("No QR code found for the given brand ID.");
    }

    // Assuming there's only one document per brandId
    const brandDoc = snapshot.docs[0];
    const qrCode = brandDoc.data().qrCode;

    if (!qrCode) {
      throw new Error("QR code not found in the document.");
    }

    // Return the QR code
    return qrCode;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}

export async function StoreCountView(email: string): Promise<number> {
  try {
    if (!email) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "stores");

    // Query to filter brands by brandId to get the QR code
    const brandQuery = query(flyersCollection, where("email", "==", email));
    const snapshot = await getDocs(brandQuery);

    if (snapshot.empty) {
      throw new Error("No QR code found for the given brand ID.");
    }

    // Assuming there's only one document per brandId
    const brandDoc = snapshot.docs[0];
    const count = brandDoc.data()?.countView;

    if (!count) {
      throw new Error("QR code not found in the document.");
    }

    // Return the QR code
    return count;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}

interface ScanHistory {
  userId: string;
  postalCode: string;
  scannedAt: string;
}

export async function GetScanHistoryByEmail(
  email: string
): Promise<ScanHistory[]> {
  try {
    if (!email) {
      throw new Error("Store email is required.");
    }

    const storesCollection = collection(db, "stores");

    // Query to find the store by email
    const storeQuery = query(storesCollection, where("email", "==", email));
    const storeSnapshot = await getDocs(storeQuery);

    if (storeSnapshot.empty) {
      throw new Error("No store found for the given email.");
    }

    // Assuming there's only one document per email
    const storeDoc = storeSnapshot.docs[0];

    // Reference to scanHistory sub-collection
    const scanHistoryCollection = collection(storeDoc.ref, "scanHistory");

    // Fetch scan history documents
    const scanHistorySnapshot = await getDocs(scanHistoryCollection);

    if (scanHistorySnapshot.empty) {
      return []; // No scan history found
    }

    // Extract scan history data
    const scanHistoryData: ScanHistory[] = scanHistorySnapshot.docs.map(
      (doc) => ({
        userId: doc.data().userId,
        postalCode: doc.data().postalCode,
        scannedAt: doc.data().scannedAt,
      })
    );

    return scanHistoryData;
  } catch (error) {
    console.error("Error fetching scan history:", error);
    return [];
  }
}

export async function GetScanHistoryByEmailforBrand(
  email: string
): Promise<ScanHistory[]> {
  try {
    if (!email) {
      throw new Error("Store email is required.");
    }

    const storesCollection = collection(db, "brands");

    // Query to find the store by email
    const storeQuery = query(storesCollection, where("email", "==", email));
    const storeSnapshot = await getDocs(storeQuery);

    if (storeSnapshot.empty) {
      throw new Error("No store found for the given email.");
    }

    // Assuming there's only one document per email
    const storeDoc = storeSnapshot.docs[0];

    // Reference to scanHistory sub-collection
    const scanHistoryCollection = collection(storeDoc.ref, "scanHistory");

    // Fetch scan history documents
    const scanHistorySnapshot = await getDocs(scanHistoryCollection);

    if (scanHistorySnapshot.empty) {
      return []; // No scan history found
    }

    // Extract scan history data
    const scanHistoryData: ScanHistory[] = scanHistorySnapshot.docs.map(
      (doc) => ({
        userId: doc.data().userId,
        postalCode: doc.data().postalCode,
        scannedAt: doc.data().scannedAt,
      })
    );

    return scanHistoryData;
  } catch (error) {
    console.error("Error fetching scan history:", error);
    return [];
  }
}
