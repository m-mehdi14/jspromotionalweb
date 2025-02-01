// "use server";

// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/config/firebase";

// export async function fetchAdminSettings(adminId: string): Promise<{
//   name: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   image: string;
// }> {
//   try {
//     const adminDoc = doc(db, "users", adminId);
//     const adminSnapshot = await getDoc(adminDoc);

//     if (!adminSnapshot.exists()) {
//       throw new Error("Admin settings not found.");
//     }

//     const data = adminSnapshot.data();
//     return {
//       name: data?.name || "",
//       email: data?.email || "",
//       role: data?.role || "",
//       createdAt: data?.createdAt || "",
//       image: data?.image || "",
//     };
//   } catch (error) {
//     console.error("Error fetching admin settings:", error);
//     throw new Error("Failed to fetch admin settings.");
//   }
// }

// ///////////////////////////////////////////////////////////////////////////////////////////////////////

"use server";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function fetchAdminSettings(adminId: string): Promise<{
  name: string;
  email: string;
  phone: string;
  postalCode: string;
  province: string;
  address: string;
  role: string;
  createdAt: string;
  image: string;
}> {
  try {
    const adminDoc = doc(db, "users", adminId);
    const adminSnapshot = await getDoc(adminDoc);

    if (!adminSnapshot.exists()) {
      throw new Error("Admin settings not found.");
    }

    const data = adminSnapshot.data();
    return {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      postalCode: data?.postalCode || "",
      province: data?.province || "",
      address: data?.address || "",
      role: data?.role || "",
      createdAt: data?.createdAt || "",
      image: data?.image || "",
    };
  } catch (error) {
    console.error("Error fetching admin settings:", error);
    throw new Error("Failed to fetch admin settings.");
  }
}
