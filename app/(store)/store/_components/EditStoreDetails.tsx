"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext/authContext";
import { editStoreDetails } from "@/actions/store/edit-store";

interface EditStoreDetailsProps {
  storeDetails: {
    name: string;
    email: string;
    description: string;
    postalCode: string;
  };
  onUpdate: () => void; // Callback to refresh store details
}

const EditStoreDetails: React.FC<EditStoreDetailsProps> = ({
  storeDetails,
  onUpdate,
}) => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: storeDetails.name || "",
    email: storeDetails.email || "",
    description: storeDetails.description || "",
    postalCode: storeDetails.postalCode || "",
    password: "", // New field for password
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await editStoreDetails({
        storeId: user?.uid || "",
        ...formData,
      });

      if (response.success) {
        toast.success("Store details updated successfully.");
        onUpdate(); // Trigger a refresh callback
        setIsDialogOpen(false);
      } else {
        toast.error(response.message || "Failed to update store details.");
      }
    } catch (error) {
      toast.error("An error occurred while updating store details.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-600">
            Edit Store Details
          </Button>
        </DialogTrigger>

        {/* Edit Store Dialog */}
        <DialogContent>
          <DialogTitle>Edit Store Details</DialogTitle>

          <div className="space-y-4 text-gray-900">
            <label>
              Name:
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Store Name"
              />
            </label>
            <label>
              Email:
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Store Email"
              />
            </label>
            <label>
              Description:
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Store Description"
              />
            </label>
            <label>
              Postal Code:
              <Input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
              />
            </label>
            <label>
              New Password:
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </label>
            <label>
              Confirm Password:
              <Input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />
            </label>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditStoreDetails;
