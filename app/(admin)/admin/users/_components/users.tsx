"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PencilIcon, TrashIcon } from "lucide-react";
import { UpdateUser } from "./update-user";
import { DeleteUser } from "./delete-user";
import { useSearchParams, useRouter } from "next/navigation";

interface User {
  id: string;
  userId: string;
  fcmToken: string;
  createdAt: string; // Stored as an ISO String in Firestore
  postalCode: string;
}

interface UsersTableProps {
  initialUsers: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const Users: React.FC<UsersTableProps> = ({
  initialUsers,
  setUsers,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // ✅ Filter users based on search query and date range before pagination
  const filteredUsers = initialUsers.filter((user) => {
    const userDate = new Date(user.createdAt).toISOString().split("T")[0]; // Extract YYYY-MM-DD

    const isWithinDateRange =
      (!startDate || userDate >= startDate) &&
      (!endDate || userDate <= endDate);

    const matchesSearch =
      user.postalCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fcmToken.toLowerCase().includes(searchQuery.toLowerCase());

    return isWithinDateRange && matchesSearch;
  });

  // ✅ Pagination logic now properly updates when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredUsers.length, searchQuery, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Update URL with search params (without reloading the page)
  // const handleApplyFilters = () => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (startDate) params.set("startDate", startDate);
  //   if (endDate) params.set("endDate", endDate);
  //   if (searchQuery) params.set("query", searchQuery);

  //   router.replace(`?${params.toString()}`);
  //   setCurrentPage(1); // Reset to first page when filters apply
  // };

  // ✅ Clear filters & reset search params
  const handleClearFilters = () => {
    setSearchQuery("");
    setStartDate("");
    setEndDate("");

    router.replace(`?`);
    setCurrentPage(1);
  };

  // ✅ Handle Edit Dialog Open
  const handleEditDialogOpen = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  // ✅ Handle Edit User
  const handleEditUser = async () => {
    if (!selectedUser) return;

    setIsUpdating(true);
    try {
      const response = await UpdateUser(
        selectedUser.postalCode,
        selectedUser.id,
        {
          userId: selectedUser.userId,
          fcmToken: selectedUser.fcmToken,
        }
      );

      if (response.success) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...selectedUser } : user
          )
        );
        setIsEditDialogOpen(false);
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  // ✅ Handle Delete User
  const handleDeleteUser = async (userId: string, postalCode: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsDeleting(userId);
    try {
      const response = await DeleteUser(postalCode, userId);

      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">All Postal Users</h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search by Postal Code, User ID, or FCM Token"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* <Button
          onClick={handleApplyFilters}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Apply
        </Button> */}
        <Button
          onClick={handleClearFilters}
          className="bg-red-500 text-white hover:bg-red-600 flex items-center"
        >
          <TrashIcon className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Users Table */}
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead>Postal Code</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>FCM Token</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-50">
              <TableCell>{user.postalCode}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.fcmToken.slice(0, 20)}...</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
              <TableCell className="flex justify-center space-x-2">
                <Button
                  variant={"secondary"}
                  size="sm"
                  onClick={() => handleEditDialogOpen(user)}
                  className="hover:border-2 hover:border-blue-500 duration-300 transition-all ease-in-out"
                >
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteUser(user.id, user.postalCode)}
                  variant={"secondary"}
                  className="hover:border-2 hover:border-red-700 duration-300 ease-in-out transition-all"
                  disabled={isDeleting === user.id}
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="User ID"
                value={selectedUser.userId}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, userId: e.target.value })
                }
              />
              <Input
                type="text"
                placeholder="FCM Token"
                value={selectedUser.fcmToken}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, fcmToken: e.target.value })
                }
              />
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setIsEditDialogOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
