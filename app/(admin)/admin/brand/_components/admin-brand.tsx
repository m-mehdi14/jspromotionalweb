/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { saveBrand } from "@/actions/admin/brand/saveBrand";
import { fetchBrandsByAdmin } from "@/actions/admin/brand/fetch-brand";
import { toast } from "sonner";
import { useAuth } from "@/lib/AuthContext/authContext";

interface Brand {
  id: string;
  name: string;
  email: string;
  description: string;
  image: string;
  adminId: string;
}

const AdminBrand = () => {
  const { user } = useAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandPassword, setBrandPassword] = useState("");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandImage, setBrandImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandImage(reader.result as string); // Set Base64 Data URI
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBrand = async () => {
    setIsSubmitting(true);

    // Validate inputs
    if (
      !brandName ||
      !brandEmail ||
      !brandPassword ||
      !brandDescription ||
      !brandImage
    ) {
      toast.error("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (!user?.uid) {
      toast.error("Admin user not authenticated.");
      setIsSubmitting(false);
      return;
    }

    const brandData = {
      name: brandName,
      email: brandEmail,
      password: brandPassword, // Admin-provided password
      description: brandDescription,
      image: brandImage,
      adminId: user.uid,
    };

    const response = await saveBrand(brandData);

    if (response.success) {
      toast.success(response.message);
      setBrandName("");
      setBrandEmail("");
      setBrandPassword("");
      setBrandDescription("");
      setBrandImage(null);
      fetchBrands(); // Refresh brands list
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);
  };

  const fetchBrands = useCallback(async () => {
    if (user?.uid) {
      setLoading(true);
      const data = await fetchBrandsByAdmin(user.uid);
      // @ts-expect-error
      setBrands(data);
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      {/* Page Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Brands</h1>

        {/* Add Brand Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Add New Brand
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Brand</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Name
                </label>
                <Input
                  placeholder="Enter brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              {/* Brand Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Email
                </label>
                <Input
                  placeholder="Enter brand email"
                  type="email"
                  value={brandEmail}
                  onChange={(e) => setBrandEmail(e.target.value)}
                />
              </div>

              {/* Brand Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Password
                </label>
                <Input
                  placeholder="Enter brand password"
                  type="password"
                  value={brandPassword}
                  onChange={(e) => setBrandPassword(e.target.value)}
                />
              </div>

              {/* Brand Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Description
                </label>
                <Textarea
                  placeholder="Enter a description"
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                />
              </div>

              {/* Brand Image */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Brand Image
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {brandImage && (
                  <div className="mt-4">
                    <Image
                      src={brandImage}
                      alt="Brand Preview"
                      width={96}
                      height={96}
                      className="object-cover rounded-md border border-gray-700"
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleAddBrand}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Brand"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {/* Brand List or No Data Message */}
      {loading ? (
        <div className="text-center text-lg">Loading brands...</div>
      ) : brands.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-2xl font-bold text-gray-300">No Brands Found</p>
          <p className="text-gray-400 mt-2">
            Add new brands to manage them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className="bg-gray-800 text-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="flex flex-col items-start">
                <CardTitle className="text-lg font-semibold">
                  {brand.name}
                </CardTitle>
                <p className="text-sm text-gray-400">{brand.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">{brand.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="ghost"
                    className="flex items-center text-green-500 hover:text-green-600"
                    onClick={() => alert("Edit Brand")}
                  >
                    <Edit className="w-4 h-4 mr-2" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center text-red-500 hover:text-red-600"
                    onClick={() => alert("Delete Brand")}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBrand;
