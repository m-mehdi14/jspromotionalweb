// "use server";

// import { db } from "@/config/firebase";
// import { collection, getDocs } from "firebase/firestore";

// export async function fetchBrandsCount(): Promise<number> {
//   try {
//     const brandsCollection = collection(db, "brands");
//     const snapshot = await getDocs(brandsCollection);
//     return snapshot.size; // Return the total number of documents
//   } catch (error) {
//     console.error("Error fetching brands count:", error);
//     return 0; // Return 0 if an error occurs
//   }
// }

// export async function fetchCategoriesCount(): Promise<number> {
//   try {
//     const categoriesCollection = collection(db, "categories");
//     const snapshot = await getDocs(categoriesCollection);
//     return snapshot.size; // Return the total number of documents
//   } catch (error) {
//     console.error("Error fetching categories count:", error);
//     return 0;
//   }
// }

// export async function fetchUsersCount(): Promise<number> {
//   try {
//     const usersCollection = collection(db, "users");
//     const snapshot = await getDocs(usersCollection);
//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching users count:", error);
//     return 0;
//   }
// }

// export async function fetchStoresCount(): Promise<number> {
//   try {
//     const storesCollection = collection(db, "stores");
//     const snapshot = await getDocs(storesCollection);
//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching stores count:", error);
//     return 0;
//   }
// }

// // export async function fetchFavouriteStoresCount(): Promise<number> {
// //   try {
// //     const favouritesCollection = collection(db, "favouriteStores");
// //     const snapshot = await getDocs(favouritesCollection);
// //     return snapshot.size;
// //   } catch (error) {
// //     console.error("Error fetching favourite stores count:", error);
// //     return 0;
// //   }
// // }

// export async function fetchSpecialEventsCount(): Promise<number> {
//   try {
//     const eventsCollection = collection(db, "specialEvents");
//     const snapshot = await getDocs(eventsCollection);
//     // Debug: Log the documents
//     console.log(snapshot.size);

//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching special events count:", error);
//     return 0;
//   }
// }

// export async function fetchFlyersCount(): Promise<number> {
//   try {
//     const flyersCollection = collection(db, "flyers");
//     const snapshot = await getDocs(flyersCollection);
//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching flyers count:", error);
//     return 0;
//   }
// }

/////////////////////////////////////////////////////////////////////////////

"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

// Helper function to filter documents based on date range
// const filterByDateRange = (docs: any[], startDate: string, endDate: string) => {
//   return docs.filter((doc) => {
//     const createdAt = doc.data().createdAt;

//     // Check if createdAt is a Firestore Timestamp
//     if (createdAt && typeof createdAt.toDate === "function") {
//       const createdAtDate = createdAt.toDate(); // Convert Firestore timestamp to JavaScript Date
//       const docDate = createdAtDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD from the timestamp
//       return docDate >= startDate && docDate <= endDate;
//     }

//     // Skip documents with missing or invalid createdAt fields
//     return false;
//   });
// };
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

export async function fetchBrandsCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const brandsCollection = collection(db, "brands");
    const snapshot = await getDocs(brandsCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size; // Return the total number of documents if no date range is provided
  } catch (error) {
    console.error("Error fetching brands count:", error);
    return 0;
  }
}

export async function fetchCategoriesCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    console.log("🚀 ~ category ---------- > ", snapshot.size);
    return snapshot.size;
  } catch (error) {
    console.error("Error fetching categories count:", error);
    return 0;
  }
}

export async function fetchUsersCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching users count:", error);
    return 0;
  }
}

export async function fetchStoresCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const storesCollection = collection(db, "stores");
    const snapshot = await getDocs(storesCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching stores count:", error);
    return 0;
  }
}

export async function fetchSpecialEventsCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const eventsCollection = collection(db, "specialEvents");
    const snapshot = await getDocs(eventsCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching special events count:", error);
    return 0;
  }
}

export async function fetchFlyersCount(
  startDate?: string,
  endDate?: string
): Promise<number> {
  try {
    const flyersCollection = collection(db, "flyers");
    const snapshot = await getDocs(flyersCollection);

    if (startDate && endDate) {
      const filteredDocs = filterByDateRange(snapshot.docs, startDate, endDate);
      return filteredDocs.length;
    }

    return snapshot.size;
  } catch (error) {
    console.error("Error fetching flyers count:", error);
    return 0;
  }
}

/////////////////////////////////////////////////////////////////

//   brand data functions
export async function fetchBrandsData(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    const brandsCollection = collection(db, "brands");
    const snapshot = await getDocs(brandsCollection);

    let brandsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (startDate && endDate) {
      brandsData = filterByDateRange(brandsData, startDate, endDate);
    }

    return brandsData;
  } catch (error) {
    console.error("Error fetching brands data:", error);
    return [];
  }
}

export async function fetchCategoriesData(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);

    let categoriesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (startDate && endDate) {
      categoriesData = filterByDateRange(categoriesData, startDate, endDate);
    }

    console.log("🚀 ~ Categories Data:", categoriesData);
    return categoriesData;
  } catch (error) {
    console.error("Error fetching categories data:", error);
    return [];
  }
}

export async function fetchStoresData(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    const storesCollection = collection(db, "stores");
    const snapshot = await getDocs(storesCollection);

    let storesData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (startDate && endDate) {
      storesData = filterByDateRange(storesData, startDate, endDate);
    }

    console.log("🚀 ~ Stores Data:", storesData);
    return storesData;
  } catch (error) {
    console.error("Error fetching stores data:", error);
    return [];
  }
}

export async function fetchSpecialEventsData(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    const eventsCollection = collection(db, "specialEvents");
    const snapshot = await getDocs(eventsCollection);

    let eventsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (startDate && endDate) {
      eventsData = filterByDateRange(eventsData, startDate, endDate);
    }

    console.log("🚀 ~ Special Events Data:", eventsData);
    return eventsData;
  } catch (error) {
    console.error("Error fetching special events data:", error);
    return [];
  }
}

export async function fetchFlyersData(
  startDate?: string,
  endDate?: string
): Promise<any[]> {
  try {
    const flyersCollection = collection(db, "flyers");
    const snapshot = await getDocs(flyersCollection);

    let flyersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (startDate && endDate) {
      flyersData = filterByDateRange(flyersData, startDate, endDate);
    }

    console.log("🚀 ~ Flyers Data:", flyersData);
    return flyersData;
  } catch (error) {
    console.error("Error fetching flyers data:", error);
    return [];
  }
}
