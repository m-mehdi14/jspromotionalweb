"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const StoreForm = ({
  initialData,
  onSave,
  isSubmitting,
}: {
  initialData: {
    name?: string;
    email?: string;
    description?: string;
    image?: string;
    postalCode?: string;
  };
  onSave: (data: {
    name: string;
    email: string;
    password: string;
    description: string;
    image: string | null;
    postalCode: string | null;
  }) => void;
  isSubmitting: boolean;
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState<string | null>(initialData?.image || "");
  const [postalCode, setPostalCode] = useState<string | null>(
    initialData?.postalCode || ""
  );

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

  const handleSubmit = () => {
    onSave({ name, email, password, description, image, postalCode });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Store Name</label>
        <Input
          placeholder="Enter store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <Input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <Input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Postal Code</label>
        <Textarea
          placeholder="Enter Postal Code"
          value={postalCode as string}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <div className="mt-4">
            <Image
              src={image}
              alt="Store Preview"
              width={96}
              height={96}
              className="rounded-md border"
            />
          </div>
        )}
      </div>

      <Button
        className="bg-green-600 hover:bg-green-700"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Saving..." : "Save Store"}
      </Button>
    </form>
  );
};

export default StoreForm;
