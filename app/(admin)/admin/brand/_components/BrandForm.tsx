import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import Image from "next/image";
import { Brand } from "./types";

// interface BrandFormData {
//   name: string;
//   email: string;
//   password?: string;
//   description: string;
//   image: string | null;
//   postalCode: string;
// }

interface BrandFormProps {
  initialData?: Brand | null;
  onSave: (
    data: Omit<Brand, "id" | "adminId"> & { password: string }
  ) => Promise<void>;
  isSubmitting: boolean;
}

const BrandForm: React.FC<BrandFormProps> = ({
  initialData,
  onSave,
  isSubmitting,
}) => {
  const [brandName, setBrandName] = useState(initialData?.name || "");
  const [brandEmail, setBrandEmail] = useState(initialData?.email || "");
  const [brandPassword, setBrandPassword] = useState(
    initialData?.password || ""
  );
  const [brandDescription, setBrandDescription] = useState(
    initialData?.description || ""
  );
  const [brandImage, setBrandImage] = useState<string | null>(
    initialData?.image || null
  );
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || "");

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

  const handleSubmit = () => {
    onSave({
      name: brandName,
      email: brandEmail,
      password: brandPassword,
      description: brandDescription,
      image: brandImage,
      postalCode,
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Input
        placeholder="Enter brand name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
      <Input
        placeholder="Enter brand email"
        type="email"
        value={brandEmail}
        onChange={(e) => setBrandEmail(e.target.value)}
        disabled={!!initialData} // Disable email editing in edit mode
      />
      <Input
        placeholder="Enter password"
        type="password"
        value={brandPassword}
        onChange={(e) => setBrandPassword(e.target.value)}
      />
      <Textarea
        placeholder="Enter a description"
        value={brandDescription}
        onChange={(e) => setBrandDescription(e.target.value)}
      />
      <Input
        placeholder="Enter your postal code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
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
      <DialogFooter>
        <Button
          type="button"
          className="bg-green-600 hover:bg-green-700"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Brand"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default BrandForm;
