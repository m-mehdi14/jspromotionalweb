"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchBrandsCount(): Promise<number> {
    try {
        const brandsCollection = collection(db, "brands");
        const snapshot = await getDocs(brandsCollection);
        return snapshot.size; // Return the total number of documents
    } catch (error) {
        console.error("Error fetching brands count:", error);
        return 0; // Return 0 if an error occurs
    }
}

export async function fetchCategoriesCount(): Promise<number> {
    try {
        const categoriesCollection = collection(db, "categories");
        const snapshot = await getDocs(categoriesCollection);
        return snapshot.size; // Return the total number of documents
    } catch (error) {
        console.error("Error fetching categories count:", error);
        return 0;
    }
}

export async function fetchUsersCount(): Promise<number> {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        return snapshot.size;
    } catch (error) {
        console.error("Error fetching users count:", error);
        return 0;
    }
}

export async function fetchStoresCount(): Promise<number> {
    try {
        const storesCollection = collection(db, "stores");
        const snapshot = await getDocs(storesCollection);
        return snapshot.size;
    } catch (error) {
        console.error("Error fetching stores count:", error);
        return 0;
    }
}

// export async function fetchFavouriteStoresCount(): Promise<number> {
//   try {
//     const favouritesCollection = collection(db, "favouriteStores");
//     const snapshot = await getDocs(favouritesCollection);
//     return snapshot.size;
//   } catch (error) {
//     console.error("Error fetching favourite stores count:", error);
//     return 0;
//   }
// }

export async function fetchSpecialEventsCount(): Promise<number> {
    try {
        const eventsCollection = collection(db, "specialEvents");
        const snapshot = await getDocs(eventsCollection);
        // Debug: Log the documents
        console.log(snapshot.size);

        return snapshot.size;
    } catch (error) {
        console.error("Error fetching special events count:", error);
        return 0;
    }
}

export async function fetchFlyersCount(): Promise<number> {
    try {
        const flyersCollection = collection(db, "flyers");
        const snapshot = await getDocs(flyersCollection);
        return snapshot.size;
    } catch (error) {
        console.error("Error fetching flyers count:", error);
        return 0;
    }
}
