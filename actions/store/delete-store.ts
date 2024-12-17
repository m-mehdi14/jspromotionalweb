"use server";
import { db } from "@/config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export async function deleteStore({
  storeId,
}: {
  storeId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const storeRef = doc(db, "stores", storeId);

    await deleteDoc(storeRef);

    return { success: true, message: "Store successfully deleted!" };
  } catch (error) {
    console.error("Error deleting store:", error);
    return { success: false, message: "Failed to delete store." };
  }
}
