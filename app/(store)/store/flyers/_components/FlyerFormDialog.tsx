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
    } else {
      setFormData({
        title: "",
        description: "",
        image: null,
        validFrom: "",
        validTo: "",
        storeId,
      });
    }
  }, [flyer, storeId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string | null,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // onSave(formData);
    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }
    // onSave(formData);
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
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
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
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`bg-${
              isSubmitting ? "gray" : "green"
            }-600 hover:bg-green-700`}
          >
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
