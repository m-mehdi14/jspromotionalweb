import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "./authContext";

interface AuthenticatedRouteProps {
  children: ReactNode;
}

export function AuthenticatedRoute({ children }: AuthenticatedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>{" "}
        {/* Replace with a spinner or skeleton */}
      </div>
    );
  }

  return <>{children}</>;
}
