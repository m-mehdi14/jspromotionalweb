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

export async function fetchStoresCountByBrand(
  brandId: string
): Promise<number> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const storesCollection = collection(db, "stores");

    // Query stores where `brandId` matches
    const storesQuery = query(
      storesCollection,
      where("brandId", "==", brandId)
    );
    const snapshot = await getDocs(storesQuery);

    // Return the count of stores
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching stores count by brand ID:", error);
    return 0;
  }
}

// export async function fetchFavouriteStoresCount(): Promise<number> {
//   try {
//     const favouritesCollection = collection(db, "favouriteStores");
//     const snapshot = await getDocs(favouritesCollection);
//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching favourite stores count:", error);
//     return 0;
//   }
// }

export async function fetchSpecialEventsCountByBrand(
  brandId: string
): Promise<number> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const eventsCollection = collection(db, "specialEvents");

    // Query to filter special events by brandId
    const eventsQuery = query(
      eventsCollection,
      where("brandId", "==", brandId)
    );
    const snapshot = await getDocs(eventsQuery);

    // Return the count of special events
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching special events count by brand ID:", error);
    return 0;
  }
}

export async function fetchFlyersCountByBrand(
  brandId: string
): Promise<number> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const flyersCollection = collection(db, "flyers");

    // Query to filter flyers by brandId
    const flyersQuery = query(
      flyersCollection,
      where("brandId", "==", brandId)
    );
    const snapshot = await getDocs(flyersQuery);

    // Return the count of flyers
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching flyers count by brand ID:", error);
    return 0;
  }
}

export async function fetchCouponCountByBrand(
  brandId: string
): Promise<number> {
  try {
    if (!brandId) {
      throw new Error("Brand ID is required.");
    }

    const flyersCollection = collection(db, "couponGifts");

    // Query to filter flyers by brandId
    const flyersQuery = query(
      flyersCollection,
      where("brandId", "==", brandId)
    );
    const snapshot = await getDocs(flyersQuery);

    // Return the count of flyers
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching flyers count by brand ID:", error);
    return 0;
  }
}

export async function fetchSpecialEventsCountByStore(
  storeId: string
): Promise<number> {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const eventsCollection = collection(db, "specialEvents");

    // Query to filter special events by storeId
    const eventsQuery = query(
      eventsCollection,
      where("storeIds", "array-contains", storeId) // Assuming `storeIds` is an array
    );
    const snapshot = await getDocs(eventsQuery);

    // Return the count of special events
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching special events count by store ID:", error);
    return 0;
  }
}

export async function fetchFlyersCountByStore(
  storeId: string
): Promise<number> {
  try {
    if (!storeId) {
      throw new Error("Store ID is required.");
    }

    const flyersCollection = collection(db, "storeFlyers");

    // Query to filter flyers by storeId
    const flyersQuery = query(
      flyersCollection,
      where("storeIds", "array-contains", storeId) // Assuming `storeIds` is an array
    );
    const snapshot = await getDocs(flyersQuery);

    // Return the count of flyers
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching flyers count by store ID:", error);
    return 0;
  }
}

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
