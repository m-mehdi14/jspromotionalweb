// "use server";
// import { db } from "@/config/firebase";
// import { collection, getDocs } from "firebase/firestore";

// interface Flyer {
//   id: string;
//   brandId: string;
//   title: string;
//   description: string;
//   image: string | null;
//   storeId: string;
//   validFrom: string;
//   validTo: string;
//   createdAt: string;
// }

// export async function fetchFlyers(): Promise<Flyer[]> {
//   try {
//     const flyersCollection = collection(db, "flyers");
//     const snapshot = await getDocs(flyersCollection);

//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Flyer[];
//   } catch (error) {
//     console.error("Error fetching flyers:", error);
//     return [];
//   }
// }

// export async function fetchAllFlyersAndStoreFlyers() {
//   try {
//     // Fetch Flyers
//     const flyersCollection = collection(db, "flyers");
//     const flyersSnapshot = await getDocs(flyersCollection);
//     const flyers = flyersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       type: "flyer",
//       ...doc.data(),
//     }));

//     // Fetch Store Flyers
//     const storeFlyersCollection = collection(db, "storeFlyers");
//     const storeFlyersSnapshot = await getDocs(storeFlyersCollection);
//     const storeFlyers = storeFlyersSnapshot.docs.map((doc) => ({
//       id: doc.id,
//       type: "storeFlyer",
//       ...doc.data(),
//     }));

//     // Merge Both Collections
//     const allFlyers = [...flyers, ...storeFlyers];
//     return { success: true, data: allFlyers };
//   } catch (error) {
//     console.error("Error fetching flyers and store flyers:", error);
//     return { success: false, error: "Failed to fetch flyers." };
//   }
// }

////////////////////////////////////////////////////////////////////////

"use server";

import { db } from "@/config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

interface Flyer {
  id: string;
  brandId: string;
  brandName?: string; // Include brandName
  storeId: string;
  storeName?: string; // Include storeName
  title: string;
  description: string;
  image: string | null;
  validFrom: string;
  validTo: string;
  createdAt: string;
  type: "flyer" | "storeFlyer";
}

export async function fetchAllFlyersAndStoreFlyers() {
  try {
    // Fetch Flyers
    const flyersCollection = collection(db, "flyers");
    const flyersSnapshot = await getDocs(flyersCollection);
    const flyers = flyersSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "flyer",
      ...doc.data(),
    })) as Flyer[];

    // Fetch Store Flyers
    const storeFlyersCollection = collection(db, "storeFlyers");
    const storeFlyersSnapshot = await getDocs(storeFlyersCollection);
    const storeFlyers = storeFlyersSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "storeFlyer",
      ...doc.data(),
    })) as Flyer[];

    // Merge Both Collections
    let allFlyers = [...flyers, ...storeFlyers];

    // Fetch brandName and storeName for each flyer
    allFlyers = await Promise.all(
      allFlyers.map(async (flyer) => {
        let brandName = "Unknown Brand";
        let storeName = "Unknown Store";

        // Fetch Brand Name
        if (flyer.brandId) {
          const brandDocRef = doc(db, "brands", flyer.brandId);
          const brandSnap = await getDoc(brandDocRef);
          if (brandSnap.exists()) {
            brandName = brandSnap.data().name;
          }
        }

        // Fetch Store Name
        if (flyer.storeId) {
          const storeDocRef = doc(db, "stores", flyer.storeId);
          const storeSnap = await getDoc(storeDocRef);
          if (storeSnap.exists()) {
            storeName = storeSnap.data().name;
          }
        }

        return { ...flyer, brandName, storeName };
      })
    );

    return { success: true, data: allFlyers };
  } catch (error) {
    console.error("Error fetching flyers and store flyers:", error);
    return { success: false, error: "Failed to fetch flyers." };
  }
}
