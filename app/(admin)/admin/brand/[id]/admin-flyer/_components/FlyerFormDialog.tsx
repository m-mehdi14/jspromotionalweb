"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Flyer } from "../../admin-store/_components/types";
import { toast } from "sonner";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetchCategories } from "@/actions/admin/categories/fetch-categories"; // Import the fetchCategories server action

export const FlyerFormDialog = ({
  isOpen,
  onClose,
  onSave,
  flyer,
  brandId,
  isSubmitting,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Flyer, "id">) => void;
  flyer: Flyer | null;
  brandId: string;
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState<Omit<Flyer, "id">>({
    title: "",
    description: "",
    image: null,
    brandId,
    storeIds: [],
    validFrom: "",
    validTo: "",
    createdAt: new Date().toISOString(),
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategory, setSelectedCategory] = useState("");

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
      setFormData({ ...flyer, brandId });
      setSelectedCategory(flyer.id || ""); // Assuming flyer has a categoryId field
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        brandId,
        storeIds: [],
        validFrom: "",
        validTo: "",
        createdAt: new Date().toISOString(),
      });
      setSelectedCategory("");
    }
  }, [flyer, brandId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.validFrom || !formData.validTo) {
      toast.error("Please fill in all required fields.");
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
      <DialogContent>
        <DialogTitle>{flyer ? "Edit Flyer" : "Add New Flyer"}</DialogTitle>
        <form className="space-y-4">
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <Textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {/* <Input type="file" accept="image/*" onChange={handleImageUpload} /> */}
          <Button
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("imageUpload")?.click();
            }}
          >
            Upload Image
          </Button>
          <p className="text-sm text-gray-500">
            Recommended size: 1280x720 pixels
          </p>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          {formData.image && (
            <Image
              src={formData.image}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-auto mt-4 rounded-md"
            />
          )}

          {/* Category Select Field */}
          <Select
            onValueChange={(value) => setSelectedCategory(value)}
            value={selectedCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Select a Category"
                defaultValue={selectedCategory}
              />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.name}
                  className=" hover:bg-gray-100 transition-all duration-300 ease-in-out"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={formData.validFrom}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, validFrom: e.target.value }))
            }
          />
          <Input
            type="date"
            value={formData.validTo}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, validTo: e.target.value }))
            }
          />

          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : flyer
              ? "Save Changes"
              : "Create Flyer"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
