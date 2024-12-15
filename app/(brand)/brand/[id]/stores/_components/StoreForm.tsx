"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Store } from "./types";

interface StoreFormProps {
  initialData?: {
    name: string;
    email: string;
    password?: string;
    description: string;
    image?: string;
    postalCode: string;
  };
  onSave: (storeData: Store) => void;
  isSubmitting: boolean;
}

const StoreForm: React.FC<StoreFormProps> = ({
  initialData,
  onSave,
  isSubmitting,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState<string | null>(initialData?.image || null);
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setDescription(initialData.description);
      setImage(initialData.image || null);
      setPostalCode(initialData.postalCode);
    }
  }, [initialData]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, email, password, description, image, postalCode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Store Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter store name"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Store Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter store email"
          required
          disabled={!!initialData} // Disable editing email in edit mode
        />
      </div>

      {/* Password */}
      {!initialData && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Store Password
          </label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter store password"
            required
          />
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Store Description
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter store description"
          required
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Store Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <Image
            src={image}
            alt="Preview"
            className="mt-4 w-24 h-24 object-cover rounded border"
            height={96}
            width={96}
          />
        )}
      </div>

      {/* Postal Code */}
      <div>
        <label className="block text-sm font-medium mb-2">Postal Code</label>
        <Input
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter postal code"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 hover:bg-green-700"
      >
        {isSubmitting ? "Saving..." : "Save Store"}
      </Button>
    </form>
  );
};

export default StoreForm;
