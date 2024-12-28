"use server";

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchCategories() {
  try {
    const categoriesCollection = collection(db, "categories");
    const snapshot = await getDocs(categoriesCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories.");
  }
}
