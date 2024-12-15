import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Store {
  id?: string;
  name: string;
  email: string;
  password?: string;
  description: string;
  image: string | null;
  postalCode: string;
}

interface StoreFormProps {
  initialData: Store | null;
  onSave: (storeData: Omit<Store, "id"> & { password: string }) => void;
  isSubmitting: boolean;
}

const StoreForm = ({ initialData, onSave, isSubmitting }: StoreFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState(initialData?.password || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Base64 Data URI
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, password, description, image, postalCode });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Store Name</label>
        <Input
          placeholder="Enter store name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Store Email</label>
        <Input
          placeholder="Enter store email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <Input
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          placeholder="Enter store description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Store Image</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <div className="mt-4">
            <Image
              src={image}
              alt="Store Preview"
              width={100}
              height={100}
              className="object-cover rounded-md border border-gray-700"
            />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Postal Code</label>
        <Input
          placeholder="Enter postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="bg-blue-600">
        {isSubmitting ? "Saving..." : "Save Store"}
      </Button>
    </form>
  );
};

export default StoreForm;
