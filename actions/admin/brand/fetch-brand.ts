"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { Brand } from "@/app/(admin)/admin/brand/_components/types";

export async function fetchBrandsByAdmin(adminId: string): Promise<Brand[]> {
  try {
    const brandsCollection = collection(db, "brands");
    const q = query(brandsCollection, where("adminId", "==", adminId));

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
