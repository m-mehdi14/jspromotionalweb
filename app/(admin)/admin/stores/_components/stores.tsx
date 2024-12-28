"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface Store {
  id: string;
  brandId: string;
  createdAt: string;
  description: string;
  email: string;
  name: string;
  postalCode: string;
  type: string;
  image: string | null;
}

interface StoresTableProps {
  stores: Store[];
}

export const Stores: React.FC<StoresTableProps> = ({ stores }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter stores based on the search query
  const filteredStores = stores.filter((store) => {
    const name = store.name || ""; // Ensure `name` is a string
    const email = store.email || ""; // Ensure `email` is a string
    const description = store.description || ""; // Ensure `description` is a string

    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Stores</h2>
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by name, email, or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Brand ID</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>
                  <Image
                    src={store.image || "https://via.placeholder.com/50"}
                    alt={store.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{store.name || "N/A"}</TableCell>
                <TableCell>{store.email || "N/A"}</TableCell>
                <TableCell>{store.description || "N/A"}</TableCell>
                <TableCell>{store.brandId || "N/A"}</TableCell>
                <TableCell>{store.postalCode || "N/A"}</TableCell>
                <TableCell>{store.type || "N/A"}</TableCell>
                <TableCell>
                  {store.createdAt
                    ? new Date(store.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-gray-500 font-medium py-4"
              >
                No stores found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
