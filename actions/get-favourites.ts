"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getFavoritesFromFirebase = async () => {
  try {
    const favoritesCollection = collection(db, "favorites");
    const querySnapshot = await getDocs(favoritesCollection);

    const favorites = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firestore's generated document ID
      ...doc.data(),
    }));

    console.log("Fetched favorites from Firebase:", favorites);
    return favorites;
  } catch (error) {
    console.error("Error fetching favorites from Firebase:", error);
    throw new Error("Failed to fetch favorites from Firebase.");
  }
};
