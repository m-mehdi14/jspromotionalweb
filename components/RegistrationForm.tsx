"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { saveBrand } from "@/actions/admin/brand/saveBrand";
import { toast } from "sonner";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({
  isOpen,
  onClose,
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Brand Information
    brandName: "",
    brandEmail: "",
    brandPassword: "",
    brandDescription: "",
    brandImage: null as string | null,
    postalCode: "",
    termsAccepted: false,
    marketingAccepted: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          brandImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("🚀 Brand registration form submitted:", formData);

      // Validate required fields
      if (!formData.brandImage) {
        toast.error("Brand logo/image is required.");
        setIsSubmitting(false);
        return;
      }

      if (!formData.termsAccepted) {
        toast.error("Please accept the Terms of Service to continue.");
        setIsSubmitting(false);
        return;
      }

      // Prepare brand data for saveBrand action
      const brandData = {
        name: formData.brandName,
        email: formData.brandEmail,
        password: formData.brandPassword,
        description: formData.brandDescription,
        image: formData.brandImage,
        adminId: "admin-user-id", // You might want to get this from context or props
        postalCode: formData.postalCode,
      };

      console.log("🚀 Calling saveBrand with data:", brandData);

      // Call the saveBrand action
      const result = await saveBrand(brandData);

      console.log("🚀 saveBrand response:", result);

      if (result.success) {
        toast.success(result.message);
        // Reset form
        setFormData({
          brandName: "",
          brandEmail: "",
          brandPassword: "",
          brandDescription: "",
          brandImage: null,
          postalCode: "",
          termsAccepted: false,
          marketingAccepted: false,
        });
        onClose();
      } else {
        toast.error(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("❌ Error during brand registration:", error);
      toast.error("An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Register Your Brand
              </h2>
              <p className="text-gray-600 mt-2">
                Create your brand account and start managing your digital flyers
                and stores
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Brand Registration Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Brand Registration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="brandName"
                    className="text-sm font-medium text-gray-900"
                  >
                    Brand Name *
                  </Label>
                  <Input
                    id="brandName"
                    type="text"
                    placeholder="Your Brand Name"
                    value={formData.brandName}
                    onChange={(e) =>
                      handleInputChange("brandName", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="brandEmail"
                    className="text-sm font-medium text-gray-900"
                  >
                    Brand Email *
                  </Label>
                  <Input
                    id="brandEmail"
                    type="email"
                    placeholder="brand@email.com"
                    value={formData.brandEmail}
                    onChange={(e) =>
                      handleInputChange("brandEmail", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="brandPassword"
                    className="text-sm font-medium text-gray-900"
                  >
                    Password *
                  </Label>
                  <Input
                    id="brandPassword"
                    type="password"
                    placeholder="Create a password"
                    value={formData.brandPassword}
                    onChange={(e) =>
                      handleInputChange("brandPassword", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="postalCode"
                    className="text-sm font-medium text-gray-900"
                  >
                    Postal Code *
                  </Label>
                  <Input
                    id="postalCode"
                    type="text"
                    placeholder="12345"
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <Label
                  htmlFor="brandDescription"
                  className="text-sm font-medium text-gray-900"
                >
                  Brand Description *
                </Label>
                <Textarea
                  id="brandDescription"
                  placeholder="Describe your brand..."
                  value={formData.brandDescription}
                  onChange={(e) =>
                    handleInputChange("brandDescription", e.target.value)
                  }
                  className="mt-1"
                  rows={3}
                  required
                />
              </div>
              <div className="mt-6">
                <Label
                  htmlFor="brandImage"
                  className="text-sm font-medium text-gray-900"
                >
                  Brand Logo/Image *
                </Label>
                <Input
                  id="brandImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                  required
                />
                {formData.brandImage && (
                  <div className="mt-4">
                    <img
                      src={formData.brandImage}
                      alt="Brand Preview"
                      className="w-24 h-24 object-cover rounded-md border border-gray-300"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    handleInputChange("termsAccepted", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  required
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-gray-700"
                >
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketingAccepted"
                  checked={formData.marketingAccepted}
                  onChange={(e) =>
                    handleInputChange("marketingAccepted", e.target.checked)
                  }
                  className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="marketingAccepted"
                  className="text-sm text-gray-700"
                >
                  I would like to receive marketing communications and updates
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering Brand..." : "Register Brand"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
