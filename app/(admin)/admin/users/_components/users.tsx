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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createAdminUser } from "@/actions/admin/sign-up/createAdminUser";
import { updateAdmin } from "@/actions/admin/sign-up/update-admin";
import { deleteAdmin } from "@/actions/admin/sign-up/delete-adminUser";
import { PencilIcon, TrashIcon } from "lucide-react";

interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface UsersTableProps {
  initialUsers: User[];
}

export const Users: React.FC<UsersTableProps> = ({ initialUsers }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Dialog States
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Filter and Paginate Users
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCreateAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password || !newAdmin.name) {
      toast.error("Please fill out all fields.");
      return;
    }

    setIsCreating(true);
    try {
      const response = await createAdminUser(
        newAdmin.email,
        newAdmin.password,
        newAdmin.name
      );
      if (response.success) {
        toast.success("Admin user created successfully!");
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            uid: crypto.randomUUID(),
            name: newAdmin.name,
            email: newAdmin.email,
            role: "admin",
            createdAt: new Date().toISOString(),
          },
        ]);
        setIsCreateDialogOpen(false);
        setNewAdmin({ email: "", password: "", name: "" });
      } else {
        toast.error(response.error || "Failed to create admin user.");
      }
    } catch (error) {
      console.error("Error creating admin user:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleEditAdmin = async () => {
    if (!selectedUser) return;

    setIsUpdating(true);
    try {
      const response = await updateAdmin(selectedUser.uid, {
        email: selectedUser.email,
        name: selectedUser.name,
      });

      if (response.success) {
        toast.success("Admin user updated successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.uid === selectedUser.uid ? { ...selectedUser } : user
          )
        );
        setIsEditDialogOpen(false);
        setSelectedUser(null);
      } else {
        toast.error(response.message || "Failed to update admin user.");
      }
    } catch (error) {
      console.error("Error updating admin user:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAdmin = async (adminId: string) => {
    setIsDeleting(adminId);
    try {
      const response = await deleteAdmin(adminId);
      if (response.success) {
        toast.success("Admin user deleted successfully!");
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.uid !== adminId)
        );
      } else {
        toast.error(response.message || "Failed to delete admin user.");
      }
    } catch (error) {
      console.error("Error deleting admin user:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search by name, email, or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            Add Admin User
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>UID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>{user.uid}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteAdmin(user.uid)}
                      disabled={isDeleting === user.uid}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          variant={"secondary"}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </div>

      {/* Create Admin Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Admin User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="Password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />
            <Button onClick={handleCreateAdmin} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={selectedUser.name}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={selectedUser.email}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, email: e.target.value })
                }
              />
              <Button onClick={handleEditAdmin} disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update Admin"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
