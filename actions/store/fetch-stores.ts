"use server";

import { db } from "@/config/firebase"; // Firebase Firestore instance
import { collection, query, where, getDocs } from "firebase/firestore";

interface StoreMetrics {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

// Function to fetch store metrics
export async function fetchStoreMetrics(
  storeId: string
): Promise<StoreMetrics> {
  try {
    // Initialize Firestore queries
    const ordersRef = collection(db, "orders");
    const customersRef = collection(db, "customers");

    // Fetch total orders and revenue for the store
    const ordersQuery = query(ordersRef, where("storeId", "==", storeId));
    const ordersSnapshot = await getDocs(ordersQuery);

    let totalOrders = 0;
    let totalRevenue = 0;

    ordersSnapshot.forEach((doc) => {
      const data = doc.data();
      totalOrders += 1;
      totalRevenue += data.amount || 0; // Assuming each order has an 'amount' field
    });

    // Fetch total customers for the store
    const customersQuery = query(customersRef, where("storeId", "==", storeId));
    const customersSnapshot = await getDocs(customersQuery);

    const totalCustomers = customersSnapshot.size; // Number of customers

    return {
      totalOrders,
      totalRevenue,
      totalCustomers,
    };
  } catch (error) {
    console.error("Error fetching store metrics:", error);
    throw new Error("Failed to fetch store metrics.");
  }
}
