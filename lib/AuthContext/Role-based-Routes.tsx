"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MoonLoader } from "react-spinners"; // Make sure react-spinners is installed
import { useAuth } from "./authContext";

type UserRole = "admin" | "brand" | "store";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export function RoleBasedRoute({
  allowedRoles,
  children,
}: RoleBasedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log(
          "Redirected to Home page from Role Based Route line number 26"
        );
        router.push("/"); // Redirect to home if not authenticated
      } else if (!allowedRoles.includes(user.role as UserRole)) {
        router.push("/unauthorized"); // Redirect to unauthorized page if role is not allowed
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <MoonLoader size={35} color="#4A5568" />
      </div>
    );
  }

  return <>{children}</>;
}
