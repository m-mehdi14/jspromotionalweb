import { db } from "@/config/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function fetchCouponGifts(): Promise<{
  success: boolean;
  data: Array<{
    id: string;
    brandName: string;
    storeName: string;
    [key: string]: unknown;
  }>;
  error?: string;
}> {
  try {
    const couponsCollection = collection(db, "couponGifts");
    const snapshot = await getDocs(couponsCollection);

    const coupons = await Promise.all(
      snapshot.docs.map(async (docSnapshot) => {
        const couponData = docSnapshot.data();
        const { brandId, storeId } = couponData;

        let brandName = "Unknown";
        let storeName = "Unknown";

        // Fetch the brand details if brandId exists
        if (brandId) {
          const brandDoc = await getDoc(doc(db, "brands", brandId));
          if (brandDoc.exists()) {
            brandName = brandDoc.data().name || "Unknown";
          }
        }

        // Fetch the store details if storeId exists
        if (storeId) {
          const storeDoc = await getDoc(doc(db, "stores", storeId));
          if (storeDoc.exists()) {
            storeName = storeDoc.data().name || "Unknown";
          }
        }

        return {
          ...couponData,
          id: docSnapshot.id,
          brandName,
          storeName,
        };
      })
    );

    return { success: true, data: coupons };
  } catch (error) {
    console.error("Error fetching coupon gifts:", error);
    return {
      success: false,
      data: [],
      error:
        // @ts-expect-error ignore
        error.message,
    };
  }
}
