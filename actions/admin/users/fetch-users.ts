"use server";

import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export async function FetchUsers(): Promise<User[]> {
  try {
    const usersCollection = collection(db, "users");
    const snapshot = await getDocs(usersCollection);

    const users: User[] = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as User[];

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
