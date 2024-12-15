"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Brand } from "@/app/(admin)/admin/brand/_components/types";

export async function fetchStoresByBrand(brandId: string): Promise<Brand[]> {
  try {
    const brandsCollection = collection(db, "stores");
    const q = query(brandsCollection, where("brandId", "==", brandId));

    const querySnapshot = await getDocs(q);
    const brands = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Brand[];
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}
