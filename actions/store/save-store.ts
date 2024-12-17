"use server";
import { db } from "@/config/firebase";
import { doc, collection, setDoc } from "firebase/firestore";

export async function saveStore({
  name,
  email,
  description,
  image,
  brandId,
}: {
  name: string;
  email: string;
  description: string;
  image?: string;
  brandId: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const storeId = crypto.randomUUID();
    const storeData = {
      name,
      email,
      description,
      image: image || "",
      brandId,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(collection(db, "stores"), storeId), storeData);

    return { success: true, message: "Store successfully created!" };
  } catch (error) {
    console.error("Error saving store:", error);
    return { success: false, message: "Failed to create store." };
  }
}
