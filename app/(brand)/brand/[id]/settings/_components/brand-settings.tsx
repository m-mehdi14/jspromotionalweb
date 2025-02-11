// "use client";

// import React, { useState, useEffect } from "react";
// import { toast } from "sonner";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { updateBrandSettings } from "@/actions/brand/settings/update-settings";
// import { fetchBrandSettings } from "@/actions/brand/settings/fetch-settings";
// import Image from "next/image";
// import { useAuth } from "@/lib/AuthContext/authContext";

// const BrandSettings = ({ brandId }: { brandId: string }) => {
//   const { handleLogout } = useAuth();
//   const [settings, setSettings] = useState({
//     name: "",
//     description: "",
//     email: "",
//     image: null as string | null,
//     notifications: true,
//   });
//   const [passwords, setPasswords] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmNewPassword: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchSettings = React.useCallback(async () => {
//     try {
//       const data = await fetchBrandSettings(brandId);
//       setSettings({
//         name: data.name || "",
//         description: data.description || "",
//         email: data.email || "",
//         image: data.image || null,
//         notifications:
//           data.notifications !== undefined ? data.notifications : true,
//       });
//     } catch (error) {
//       console.error("Error fetching settings:", error);
//       toast.error("Failed to load settings.");
//     }
//   }, [brandId]);

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSettings((prev) => ({ ...prev, image: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveSettings = async () => {
//     const { currentPassword, newPassword, confirmNewPassword } = passwords;

//     if (newPassword || confirmNewPassword || currentPassword) {
//       if (!currentPassword || !newPassword || !confirmNewPassword) {
//         return toast.error("All password fields are required.");
//       }

//       if (newPassword !== confirmNewPassword) {
//         return toast.error("New passwords do not match.");
//       }
//     }

//     setIsSubmitting(true);
//     try {
//       await updateBrandSettings(brandId, {
//         ...settings,
//         password: newPassword ? newPassword : undefined, // Include password only if provided
//       });

//       toast.success("Settings updated successfully!");
//       setPasswords({
//         currentPassword: "",
//         newPassword: "",
//         confirmNewPassword: "",
//       });
//     } catch (error) {
//       console.error("Error updating settings:", error);
//       toast.error("Failed to update settings.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     fetchSettings();
//   }, [brandId, fetchSettings]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Brand Settings</h1>

//       <div className="space-y-6 bg-white p-6 rounded-lg shadow">
//         {/* Brand Information */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Brand Information</h2>
//           <Input
//             placeholder="Name"
//             value={settings.name}
//             onChange={(e) =>
//               setSettings((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//           <Textarea
//             placeholder="Description"
//             value={settings.description}
//             onChange={(e) =>
//               setSettings((prev) => ({ ...prev, description: e.target.value }))
//             }
//             className="mt-4"
//           />
//           <Input
//             placeholder="Email"
//             value={settings.email}
//             onChange={(e) =>
//               setSettings((prev) => ({ ...prev, email: e.target.value }))
//             }
//             className="mt-4"
//           />
//           <Input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             className="mt-4"
//           />
//           {settings.image ? (
//             <Image
//               src={settings.image}
//               alt="Brand Logo"
//               width={128}
//               height={128}
//               className="w-32 h-32 mt-4 rounded-full border"
//             />
//           ) : (
//             <>
//               <Image
//                 src={settings.image || "https://via.placeholder.com/128"}
//                 alt="Brand Logo"
//                 width={128}
//                 height={128}
//                 className="w-32 h-32 mt-4 rounded-full border"
//               />
//             </>
//           )}
//         </div>

//         {/* Update Password */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Update Password</h2>
//           <Input
//             placeholder="Current Password"
//             type="password"
//             value={passwords.currentPassword}
//             onChange={(e) =>
//               setPasswords((prev) => ({
//                 ...prev,
//                 currentPassword: e.target.value,
//               }))
//             }
//           />
//           <Input
//             placeholder="New Password"
//             type="password"
//             value={passwords.newPassword}
//             onChange={(e) =>
//               setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
//             }
//             className="mt-4"
//           />
//           <Input
//             placeholder="Confirm New Password"
//             type="password"
//             value={passwords.confirmNewPassword}
//             onChange={(e) =>
//               setPasswords((prev) => ({
//                 ...prev,
//                 confirmNewPassword: e.target.value,
//               }))
//             }
//             className="mt-4"
//           />
//         </div>

//         {/* Save Changes */}
//         <div>
//           <Button
//             onClick={handleSaveSettings}
//             disabled={isSubmitting}
//             className="bg-green-600 hover:bg-green-700"
//           >
//             {isSubmitting ? "Saving..." : "Save Changes"}
//           </Button>
//         </div>
//         {/* Add logout Button */}
//         <div>
//           <Button
//             onClick={handleLogout}
//             // onClick={handleSaveSettings}
//             disabled={isSubmitting}
//             // className="bg-green-600 hover:bg-green-700"
//             variant={"destructive"}
//           >
//             {isSubmitting ? "" : "Logout"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BrandSettings;

"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateBrandSettings } from "@/actions/brand/settings/update-settings";
import { fetchBrandSettings } from "@/actions/brand/settings/fetch-settings";
import Image from "next/image";

const BrandSettings = ({ brandId }: { brandId: string }) => {
  // const { handleLogout } = useAuth();
  const [settings, setSettings] = useState({
    name: "",
    description: "",
    email: "",
    image: null as string | null,
    notifications: true,
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSettings = React.useCallback(async () => {
    try {
      const data = await fetchBrandSettings(brandId);
      setSettings({
        name: data.name || "",
        description: data.description || "",
        email: data.email || "",
        image: data.image || null,
        notifications:
          data.notifications !== undefined ? data.notifications : true,
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings.");
    }
  }, [brandId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    const { currentPassword, newPassword, confirmNewPassword } = passwords;

    if (newPassword || confirmNewPassword || currentPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return toast.error("All password fields are required.");
      }

      if (newPassword !== confirmNewPassword) {
        return toast.error("New passwords do not match.");
      }
    }

    setIsSubmitting(true);
    try {
      await updateBrandSettings(brandId, {
        ...settings,
        password: newPassword ? newPassword : undefined,
      });

      toast.success("Settings updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [brandId, fetchSettings]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Brand Settings</h1>

      {/* Horizontal Layout: Brand Information & Update Password */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row gap-8">
        {/* Brand Information */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Brand Information</h2>
          <Input
            placeholder="Name"
            value={settings.name}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Textarea
            placeholder="Description"
            value={settings.description}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mt-4"
          />
          <Input
            placeholder="Email"
            value={settings.email}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, email: e.target.value }))
            }
            className="mt-4"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-4"
          />
          {settings.image ? (
            <Image
              src={settings.image}
              alt="Brand Logo"
              width={128}
              height={128}
              className="w-32 h-32 mt-4 rounded-full border"
            />
          ) : (
            <Image
              src="https://via.placeholder.com/128"
              alt="Brand Logo"
              width={128}
              height={128}
              className="w-32 h-32 mt-4 rounded-full border"
            />
          )}
        </div>

        {/* Update Password */}
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Update Password</h2>
          <Input
            placeholder="Current Password"
            type="password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />
          <Input
            placeholder="New Password"
            type="password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            className="mt-4"
          />
          <Input
            placeholder="Confirm New Password"
            type="password"
            value={passwords.confirmNewPassword}
            onChange={(e) =>
              setPasswords((prev) => ({
                ...prev,
                confirmNewPassword: e.target.value,
              }))
            }
            className="mt-4"
          />
        </div>
      </div>

      {/* Save & Logout Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <Button
          onClick={handleSaveSettings}
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>

        {/* <Button onClick={handleLogout} variant="destructive" className="w-full md:w-auto">
          Logout
        </Button> */}
      </div>
    </div>
  );
};

export default BrandSettings;
