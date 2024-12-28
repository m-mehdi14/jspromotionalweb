"use server";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

// @ts-expect-error ignore
export async function saveCategory(categoryData) {
  try {
    const categoriesCollection = collection(db, "categories");
    await addDoc(categoriesCollection, {
      ...categoryData,
      createdAt: new Date().toISOString(),
    });

    return { success: true, message: "Category created successfully." };
  } catch (error) {
    console.error("Error saving category:", error);
    throw new Error("Failed to create category.");
  }
}
