"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Users } from "./_components/users";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import { FetchUsers } from "./_components/action";

const AdminUsersPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get filter values from search params
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await FetchUsers(startDate, endDate);
        // @ts-expect-error ignore
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Refetch on param change

  return (
    <RoleBasedRoute allowedRoles={["admin"]}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 bg-black p-7 text-white rounded-md">
          Admin Users
        </h1>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Users
            initialUsers={users}
            // @ts-expect-error ignore
            setUsers={setUsers}
          />
        )}
      </div>
    </RoleBasedRoute>
  );
};

export default AdminUsersPage;
