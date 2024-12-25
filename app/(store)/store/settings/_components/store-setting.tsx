"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext/authContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchStoreSettings } from "@/actions/store/settings/fetch-store-settings";
import { saveStoreSettings } from "@/actions/store/settings/save-store-settings";
import { updateStorePassword } from "@/actions/store/settings/update-store-settings"; // New action for updating password
import Image from "next/image";

const StoreSettings = () => {
  const { user } = useAuth();
  const storeId = user?.uid; // Store ID from AuthContext
  const [settings, setSettings] = useState({
    name: "",
    description: "",
    logo: null as string | null,
    address: "",
    postalCode: "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const fetchSettings = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchStoreSettings(storeId as string);
      setSettings({
        name: data.name || "",
        description: data.description || "",
        logo: data.logo || null,
        address: data.address || "",
        postalCode: data.postalCode || "",
      });
    } catch (error) {
      console.error("Error fetching store settings:", error);
      toast.error("Failed to fetch store settings.");
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  const handleSaveSettings = async () => {
    setIsSubmitting(true);
    try {
      await saveStoreSettings(storeId as string, settings);
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error saving store settings:", error);
      toast.error("Failed to save settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwords;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setIsPasswordSubmitting(true);
    try {
      await updateStorePassword(
        storeId as string,
        currentPassword,
        newPassword
      );
      toast.success("Password updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password.");
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchSettings();
    }
  }, [storeId, fetchSettings]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
      {isLoading ? (
        <div>Loading settings...</div>
      ) : (
        <>
          <form className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">
                Store Name
              </label>
              <Input
                placeholder="Enter store name"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                placeholder="Enter store description"
                value={settings.description}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {settings.logo && (
                <Image
                  src={settings.logo}
                  alt="Store Logo"
                  width={128}
                  height={128}
                  className="w-32 h-32 mt-4 rounded-md"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                placeholder="Enter store address"
                value={settings.address}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Postal Code
              </label>
              <Input
                placeholder="Enter postal code"
                value={settings.postalCode}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    postalCode: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              onClick={handleSaveSettings}
              disabled={isSubmitting}
              className={`bg-${
                isSubmitting ? "gray" : "green"
              }-600 hover:bg-green-700`}
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </form>

          <form className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Update Password</h2>
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="Enter current password"
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              onClick={handleUpdatePassword}
              disabled={isPasswordSubmitting}
              className={`bg-${
                isPasswordSubmitting ? "gray" : "blue"
              }-600 hover:bg-blue-700`}
            >
              {isPasswordSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default StoreSettings;
