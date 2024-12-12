/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import Cookies from "js-cookie"; // Import js-cookie
import { app, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MoonLoader } from "react-spinners";

// Define user roles
type UserRole = "admin" | "brand" | "store";

// Extend FirebaseUser to include additional fields from Firestore
// @ts-expect-error
interface ExtendedUser extends FirebaseUser {
  role?: UserRole | null;
  name?: string;
  email?: string;
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

// Helper function to fetch user data from Firestore
const fetchUserData = async (userId: string) => {
  const userDocRef = doc(db, "users", userId); // Use the 'users' collection
  const userDoc = await getDoc(userDocRef);
  return userDoc.exists() ? userDoc.data() : null;
};

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
]; // Add all public routes here

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const userData = await fetchUserData(currentUser.uid);
        if (userData) {
          const extendedUser: ExtendedUser = {
            ...currentUser,
            role: userData.role as UserRole,
            name: userData.name,
            email: userData.email,
          };
          setUser(extendedUser);

          // Set cookies for session persistence
          // secure: true
          Cookies.set("session", currentUser.uid, { expires: 1 });
          Cookies.set("role", userData.role || "", {
            expires: 1,
          });
          // secure: true,
        } else {
          console.warn("User not found in the 'users' collection.");
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
