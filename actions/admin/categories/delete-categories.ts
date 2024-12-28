"use server";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

// @ts-expect-error ignore
export async function deleteCategory(categoryId) {
  try {
    const categoryDoc = doc(db, "categories", categoryId);
    await deleteDoc(categoryDoc);

    return { success: true, message: "Category deleted successfully." };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category." };
  }
}
