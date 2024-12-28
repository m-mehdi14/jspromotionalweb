"use server";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

// @ts-expect-error ignore
export async function editCategory(categoryId, updatedData) {
  try {
    const categoryDoc = doc(db, "categories", categoryId);
    await updateDoc(categoryDoc, {
      ...updatedData,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, message: "Category updated successfully." };
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category.");
  }
}
