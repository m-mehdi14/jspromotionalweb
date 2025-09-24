"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationForm({
  isOpen,
  onClose,
}: RegistrationFormProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    businessDescription: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    termsAccepted: false,
    marketingAccepted: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, selectedPlan });
    // Here you would typically send the data to your backend
    onClose();
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
                Register Your Business
              </h2>
              <p className="text-gray-600 mt-2">
                Join Digital Flyer Pro and start creating amazing marketing
                materials today
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
            {/* Business Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Business Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="businessName"
                    className="text-sm font-medium text-gray-900"
                  >
                    Business Name *
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) =>
                      handleInputChange("businessName", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="industry"
                    className="text-sm font-medium text-gray-900"
                  >
                    Industry *
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("industry", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6">
                <Label
                  htmlFor="businessDescription"
                  className="text-sm font-medium text-gray-900"
                >
                  Business Description
                </Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Brief description of your business..."
                  value={formData.businessDescription}
                  onChange={(e) =>
                    handleInputChange("businessDescription", e.target.value)
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>

            {/* Contact Person Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Person
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-900"
                  >
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-900"
                  >
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900"
                  >
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-900"
                  >
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Address Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Business Address
              </h3>
              <div className="space-y-6">
                <div>
                  <Label
                    htmlFor="streetAddress"
                    className="text-sm font-medium text-gray-900"
                  >
                    Street Address *
                  </Label>
                  <Input
                    id="streetAddress"
                    type="text"
                    placeholder="123 Main Street"
                    value={formData.streetAddress}
                    onChange={(e) =>
                      handleInputChange("streetAddress", e.target.value)
                    }
                    className="mt-1"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-900"
                    >
                      City *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-900"
                    >
                      State *
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) =>
                        handleInputChange("state", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="zipCode"
                      className="text-sm font-medium text-gray-900"
                    >
                      ZIP Code *
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={(e) =>
                        handleInputChange("zipCode", e.target.value)
                      }
                      className="mt-1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Choose Your Plan Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Choose Your Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan === "starter"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan("starter")}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Starter
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    $19/mo
                  </p>
                  <p className="text-sm text-gray-600">
                    Perfect for small businesses
                  </p>
                </div>
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan === "professional"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan("professional")}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Professional
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    $49/mo
                  </p>
                  <p className="text-sm text-gray-600">Most popular choice</p>
                </div>
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPlan === "enterprise"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPlan("enterprise")}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Enterprise
                  </h4>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    $99/mo
                  </p>
                  <p className="text-sm text-gray-600">
                    For large organizations
                  </p>
                </div>
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
              >
                Register Business
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
