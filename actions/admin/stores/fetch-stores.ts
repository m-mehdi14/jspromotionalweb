// import { db } from "@/config/firebase";
// import { collection, getDocs } from "firebase/firestore";

// interface Store {
//   id: string;
//   brandId: string;
//   createdAt: string;
//   description: string;
//   email: string;
//   name: string;
//   postalCode: string;
//   type: string;
//   image: string | null;
// }

// export async function fetchAllStores(): Promise<Store[]> {
//   try {
//     const storesCollection = collection(db, "stores");
//     const snapshot = await getDocs(storesCollection);
//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Store[];
//   } catch (error) {
//     console.error("Error fetching stores:", error);
//     return [];
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

import { db } from "@/config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface Store {
  id: string;
  brandId: string;
  brandName?: string; // Include brandName in Store interface
  createdAt: string;
  description: string;
  email: string;
  name: string;
  postalCode: string;
  type: string;
  image: string | null;
}

export async function fetchAllStores(): Promise<Store[]> {
  try {
    const storesCollection = collection(db, "stores");
    const snapshot = await getDocs(storesCollection);
    const stores = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Store[];

    // Fetch brand names for each store
    const storesWithBrandNames = await Promise.all(
      stores.map(async (store) => {
        if (store.brandId) {
          const brandDocRef = doc(db, "brands", store.brandId);
          const brandSnap = await getDoc(brandDocRef);
          if (brandSnap.exists()) {
            return { ...store, brandName: brandSnap.data().name };
          }
        }
        return { ...store, brandName: "Unknown Brand" }; // Fallback in case brand doesn't exist
      })
    );

    return storesWithBrandNames;
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
