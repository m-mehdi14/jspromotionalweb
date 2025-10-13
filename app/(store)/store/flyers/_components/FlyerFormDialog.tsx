"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { fetchCategories } from "@/actions/admin/categories/fetch-categories";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Flyer {
  title: string;
  description: string;
  image: string | null;
  validFrom: string;
  validTo: string;
  storeId: string;
}

interface FlyerFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: Flyer) => void;
  flyer?: Flyer;
  isSubmitting: boolean;
  storeId: string;
}

export const FlyerFormDialog: React.FC<FlyerFormDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  flyer,
  isSubmitting,
  storeId,
}) => {
  const [formData, setFormData] = useState<Flyer>({
    title: "",
    description: "",
    image: null,
    validFrom: "",
    validTo: "",
    storeId,
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [imageInfo, setImageInfo] = useState<{
    originalSize: string;
    compressedSize: string;
  } | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = (await fetchCategories()) as {
          id: string;
          name: string;
        }[];
        setCategories(categoriesData); // Populate categories
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories.");
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (flyer) {
      setFormData(flyer);
      setImageInfo(null);
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        validFrom: "",
        validTo: "",
        storeId,
      });
      setImageInfo(null);
      setSelectedCategory("");
    }
  }, [flyer, storeId, isOpen]);

  const compressImage = (
    file: File,
    maxSizeMB: number = 0.8
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions (max 1280x720 recommended)
          const maxWidth = 1280;
          const maxHeight = 720;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Start with quality 0.8 and reduce if needed
          let quality = 0.8;
          let compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

          // If still too large, reduce quality
          while (
            compressedDataUrl.length > maxSizeMB * 1024 * 1024 &&
            quality > 0.1
          ) {
            quality -= 0.1;
            compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          }

          if (compressedDataUrl.length > maxSizeMB * 1024 * 1024) {
            reject(new Error("Unable to compress image to required size"));
          } else {
            resolve(compressedDataUrl);
          }
        };
        img.onerror = () => reject(new Error("Failed to load image"));
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const originalSize = file.size;

        // Check file size (max 5MB before compression)
        if (originalSize > 5 * 1024 * 1024) {
          toast.error(
            "Image file is too large. Please select an image under 5MB."
          );
          event.target.value = "";
          return;
        }

        setIsCompressing(true);
        toast.info("Compressing image, please wait...");

        const compressedImage = await compressImage(file, 0.8);
        const compressedSize = Math.round((compressedImage.length * 3) / 4 - 2);

        setFormData((prev) => ({
          ...prev,
          image: compressedImage,
        }));

        setImageInfo({
          originalSize: formatFileSize(originalSize),
          compressedSize: formatFileSize(compressedSize),
        });

        const savedPercentage = (
          ((originalSize - compressedSize) / originalSize) *
          100
        ).toFixed(0);

        toast.success(
          `Image compressed successfully! Saved ${savedPercentage}% (${formatFileSize(
            originalSize
          )} → ${formatFileSize(compressedSize)})`
        );
      } catch (error) {
        console.error("Error compressing image:", error);
        toast.error("Failed to process image. Please try a different image.");
        event.target.value = "";
        setImageInfo(null);
      } finally {
        setIsCompressing(false);
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }
    if (!formData.image) {
      toast.error("Image is required.");
      return;
    }
    if (!formData.validFrom) {
      toast.error("Valid From date is required.");
      return;
    }
    if (!formData.validTo) {
      toast.error("Valid To date is required.");
      return;
    }
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    // @ts-expect-error ignore
    onSave({ ...formData, categoryId: selectedCategory });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-xl font-bold">
          {flyer ? "Edit Flyer" : "Add New Flyer"}
        </DialogTitle>
        <form className="space-y-5">
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter flyer title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Enter flyer description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              disabled={isSubmitting}
            />
          </div>

          {/* Image Upload Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Image <span className="text-red-500">*</span>
            </label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isSubmitting || isCompressing}
            />
            <p className="text-xs text-gray-500">
              Recommended size: 1280 x 720 pixels. Max file size: 5MB
            </p>

            {/* Compression Status */}
            {isCompressing && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Compressing image...</span>
              </div>
            )}

            {/* Image Size Info */}
            {imageInfo && !isCompressing && (
              <div className="bg-green-50 border border-green-200 rounded-md p-2">
                <p className="text-xs text-green-700">
                  ✓ Image compressed: {imageInfo.originalSize} →{" "}
                  {imageInfo.compressedSize}
                </p>
              </div>
            )}
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Preview
              </label>
              <div className="border rounded-lg p-2 bg-gray-50">
                <Image
                  src={formData.image}
                  alt="Preview"
                  width={300}
                  height={169}
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>
          )}

          {/* Category Select Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <Select
              onValueChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.name}
                    className="hover:bg-gray-100 transition-all duration-300 ease-in-out"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valid From Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Valid From <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.validFrom}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, validFrom: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>

          {/* Valid To Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Valid To <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.validTo}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, validTo: e.target.value }))
              }
              disabled={isSubmitting}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Saving...</span>
              </div>
            ) : flyer ? (
              "Save Changes"
            ) : (
              "Create Flyer"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
