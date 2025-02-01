"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAdminUser } from "@/actions/admin/sign-up/createAdminUser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"; // Import loader icon (or replace with your own)
import Link from "next/link";

// Schema for form validation
const formSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address."),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
    postalCode: z.string().min(5, "Postal code must be at least 5 characters."),
    province: z.string().min(2, "Province must be at least 2 characters."),
    address: z.string().min(5, "Address must be at least 5 characters."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Confirm Password must match Password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Specify the field for the error message
  });

export const AdminAuthSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      postalCode: "",
      province: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true); // Disable fields and show loader
    const { name, email, password, phone, postalCode, province, address } =
      values;

    const result = await createAdminUser({
      email,
      password,
      name,
      phone,
      postalCode,
      province,
      address,
    });
    if (result.success) {
      toast.success(result.success);
      form.reset(); // Clear form on success
    } else {
      toast.error(result.error || "An unknown error occurred.");
    }
    setIsSubmitting(false); // Re-enable fields and hide loader
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      {/* max-w-md */}
      <Card className="w-full max-w-xl p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-600">
            Admin Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 md:space-y-0 md:grid grid-cols-2 gap-6 overflow-y-auto"
          >
            <Form {...form}>
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Postal Code Field */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your postal code"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Province Field */}
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your province"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your address"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your password"
                        type="password"
                        {...field}
                        disabled={isSubmitting} // Disable during submission
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting} // Disable during submission
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  {/* Loader Icon */}
                  <span>Signing Up...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>

            <Link
              href={"/admin-auth/login"}
              className="w-full flex flex-row items-center justify-center"
            >
              <Button
                variant={"link"}
                className="flex flex-row items-center justify-center text-gray-500 text-sm"
              >
                Already have an account ?{" "}
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuthSignUp;
