"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { fetchAdminSettings } from "@/actions/admin/settings/fetch-admin-settings";
import { saveAdminSettings } from "@/actions/admin/settings/save-admin-settings";
import { updateAdminPassword } from "@/actions/admin/settings/update-admin-settings"; // New action for password update
import { useAuth } from "@/lib/AuthContext/authContext";

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    image: null as string | ArrayBuffer | null,
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAdminSettings(user?.uid as string);
      setSettings(data);
    } catch (error) {
      console.error("Error fetching admin settings:", error);
      toast.error("Failed to fetch admin settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSubmitting(true);
    try {
      await saveAdminSettings(user?.uid as string, settings);
      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Error saving admin settings:", error);
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
      await updateAdminPassword(
        user?.uid as string,
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
        setSettings((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Settings</h1>
      {isLoading ? (
        <div>Loading settings...</div>
      ) : (
        <>
          <form className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                placeholder="Enter name"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                placeholder="Enter email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Picture
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {typeof settings.image === "string" && (
                <Image
                  src={settings.image}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 mt-4 rounded-md"
                />
              )}
              {settings.image instanceof ArrayBuffer && (
                <Image
                  src={URL.createObjectURL(new Blob([settings.image]))}
                  alt="Profile"
                  width={128}
                  height={128}
                  className="w-32 h-32 mt-4 rounded-md"
                />
              )}
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

export default AdminSettings;
