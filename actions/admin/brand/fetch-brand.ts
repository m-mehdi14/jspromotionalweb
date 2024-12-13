"use server";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export const fetchBrandsByAdmin = async (adminId: string) => {
  try {
    const brandsCollection = collection(db, "brands");
    const q = query(brandsCollection, where("adminId", "==", adminId));

    const querySnapshot = await getDocs(q);
    const brands = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};
