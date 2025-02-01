import { db } from "@/config/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Query,
  DocumentData,
} from "firebase/firestore";

/**
 * ✅ Define the User Type
 */
interface User {
  id: string;
  userId: string;
  fcmToken: string;
  createdAt: string; // ISO String format
  postalCode: string;
}

/**
 * ✅ Fetch users from Firebase with optional date range filtering
 */
export const FetchUsers = async (
  startDate?: string,
  endDate?: string
): Promise<User[]> => {
  try {
    const postalCodesCollection = collection(db, "postalCodes");
    const postalCodesSnapshot = await getDocs(postalCodesCollection);

    const allUsers: User[] = []; // ✅ FIXED: Use `const` instead of `let`

    for (const postalCodeDoc of postalCodesSnapshot.docs) {
      const postalCode = postalCodeDoc.id;
      const usersCollection = collection(
        db,
        "postalCodes",
        postalCode,
        "postalusers"
      );

      // Query users within the date range if provided
      let usersQuery: Query<DocumentData>;
      if (startDate && endDate) {
        usersQuery = query(
          usersCollection,
          where("createdAt", ">=", startDate),
          where("createdAt", "<=", endDate)
        );
      } else {
        usersQuery = usersCollection;
      }

      const usersSnapshot = await getDocs(usersQuery);

      usersSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        allUsers.push({
          id: userDoc.id,
          postalCode,
          userId: userData.userId ?? "",
          fcmToken: userData.fcmToken ?? "",
          createdAt: userData.createdAt ?? "",
        });
      });
    }

    return allUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

/**
 * ✅ Define the User Update Type
 */
interface UserUpdateData {
  userId?: string;
  fcmToken?: string;
  createdAt?: string;
}

/**
 * ✅ Update User Data in Firebase
 */
export const UpdateUser = async (
  postalCode: string,
  userId: string,
  updatedData: UserUpdateData
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!postalCode || !userId) {
      throw new Error("Postal code and user ID are required.");
    }

    const userDocRef = doc(
      db,
      "postalCodes",
      postalCode,
      "postalusers",
      userId
    );
    await updateDoc(userDocRef, { ...updatedData });

    return { success: true };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: (error as Error).message };
  }
};

/**
 * ✅ Delete a User from Firebase
 */
export const DeleteUser = async (
  postalCode: string,
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!postalCode || !userId) {
      throw new Error("Postal code and user ID are required.");
    }

    const userDocRef = doc(
      db,
      "postalCodes",
      postalCode,
      "postalusers",
      userId
    );
    await deleteDoc(userDocRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: (error as Error).message };
  }
};
