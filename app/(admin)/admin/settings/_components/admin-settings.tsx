"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { fetchAdminSettings } from "@/actions/admin/settings/fetch-admin-settings";
import { saveAdminSettings } from "@/actions/admin/settings/save-admin-settings";
import { updateAdminPassword } from "@/actions/admin/settings/update-admin-settings";
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
    <div className="min-h-screen p-8">
      <h1 className="text-start bg-black p-7 rounded-md text-3xl font-bold mb-6 text-white">
        Admin Settings
      </h1>
      {isLoading ? (
        <div className="text-center text-gray-600">Loading settings...</div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <form className="flex-1 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Profile Settings
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                placeholder="Enter name"
                value={settings.name}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                placeholder="Enter email"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Picture
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {typeof settings.image === "string" && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={settings.image}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full border"
                  />
                </div>
              )}
            </div>
            <Button
              onClick={handleSaveSettings}
              disabled={isSubmitting}
              className={`w-full bg-${isSubmitting ? "gray" : "green"}-600 hover:bg-green-700 text-white py-2 rounded-md`}
            >
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </form>

          <form className="flex-1 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Update Password
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 mb-36"
              />
            </div>
            <Button
              onClick={handleUpdatePassword}
              disabled={isPasswordSubmitting}
              className={`w-full bg-${isPasswordSubmitting ? "gray" : "blue"}-600 hover:bg-blue-700 text-white py-2 rounded-md`}
            >
              {isPasswordSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;