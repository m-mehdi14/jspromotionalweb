"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { app, db } from "@/config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MoonLoader } from "react-spinners";

// Define user roles
type UserRole = "admin" | "brand" | "store";

// Extend FirebaseUser to include additional fields from Firestore
interface ExtendedUser extends FirebaseUser {
  role?: UserRole | null;
  name?: string;
  email: string;
}

// Context interface
interface AuthContextType {
  user: ExtendedUser | null;
  loading: boolean;
  handleLogout: () => Promise<void>;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);

// Helper function to fetch user data by role
interface UserData {
  email: string;
  name: string;
  role: UserRole;
  type: string;
}

const fetchUserDataByRole = async (
  email: string,
  role: UserRole
): Promise<UserData | null> => {
  try {
    let collectionName = "";

    // Map role to Firestore collection
    switch (role) {
      case "admin":
        collectionName = "users";
        break;
      case "brand":
        collectionName = "brands";
        break;
      case "store":
        collectionName = "stores";
        break;
      default:
        console.warn("Invalid role provided:", role);
        return null;
    }

    const userCollectionRef = collection(db, collectionName);
    const q = query(userCollectionRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`User not found in the '${collectionName}' collection.`);
      return null;
    }
    // Return first matching document's data
    return querySnapshot.docs[0].data() as UserData;
  } catch (error) {
    console.error("Error fetching user data by role:", error);
    return null;
  }
};

// Public routes that do not require authentication
const publicRoutes = [
  "/",
  "/admin-auth/login",
  "/admin-auth/sign-up",
  "/admin-auth",
  "/brand-auth",
  "/brand-auth/login",
  "/brand-auth/sign-up",
  "/store-auth",
  "/store-auth/login",
  "/store-auth/sign-up",
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        let role = Cookies.get("role") as UserRole | undefined;

        if (!role) {
          // Dynamically determine role from Firestore if not cached in cookies
          const email = currentUser.email || "";

          const adminData = await fetchUserDataByRole(email, "admin");
          if (adminData) {
            role = "admin";
          } else {
            const brandData = await fetchUserDataByRole(email, "brand");
            if (brandData) {
              role = "brand";
            } else {
              const storeData = await fetchUserDataByRole(email, "store");
              if (storeData) {
                role = "store";
              }
            }
          }
        }

        if (!role) {
          console.warn("Role not determined. User may not be authorized.");
          setUser(null);
          Cookies.remove("session");
          Cookies.remove("role");

          if (!publicRoutes.includes(pathname || "")) {
            router.push("/");
          }
          setLoading(false);
          return;
        }

        // Fetch user data from the appropriate collection based on the determined role
        const userData = await fetchUserDataByRole(
          currentUser.email || "",
          role
        );

        if (userData) {
          const extendedUser: ExtendedUser = {
            ...currentUser,
            role,
            name: userData.name,
            email: userData.email,
          };
          setUser(extendedUser);

          // Set cookies for session persistence
          Cookies.set("session", currentUser.uid, { expires: 1 });
          Cookies.set("role", role, { expires: 1 });
        } else {
          console.warn(`User not found in the '${role}' collection.`);
          setUser(null);

          // Clear cookies if user not found
          Cookies.remove("session");
          Cookies.remove("role");

          if (!publicRoutes.includes(pathname || "")) {
            router.push("/");
          }
        }
      } else {
        setUser(null);

        // Clear cookies on logout
        Cookies.remove("session");
        Cookies.remove("role");

        // Redirect to home only if the current route is not public
        if (!publicRoutes.includes(pathname || "")) {
          router.push("/");
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);

    // Clear cookies on logout
    Cookies.remove("session");
    Cookies.remove("role");

    router.push("/"); // Redirect to homepage
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <MoonLoader size={35} color="#4A5568" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming Auth Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
