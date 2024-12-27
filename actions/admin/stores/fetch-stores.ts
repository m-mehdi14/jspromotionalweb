import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Store {
  id: string;
  brandId: string;
  createdAt: string;
  description: string;
  email: string;
  name: string;
  postalCode: string;
  type: string;
  image: string | null;
}

export async function fetchAllStores(): Promise<Store[]> {
  try {
    const storesCollection = collection(db, "stores");
    const snapshot = await getDocs(storesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Store[];
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
}
