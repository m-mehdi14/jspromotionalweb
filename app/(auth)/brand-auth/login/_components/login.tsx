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
import { signInBrandUser } from "@/actions/brand/login/signInBrandUser";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Import reset function
import { useRouter } from "next/navigation";
import { app } from "@/config/firebase"; // Firebase app config

// Validation schema for brand login form
const brandLoginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const BrandAuthLogin = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false); // Forgot password state

  const form = useForm({
    resolver: zodResolver(brandLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof brandLoginSchema>) => {
    setIsSubmitting(true);

    try {
      const { email, password } = values;
      const result = await signInBrandUser(email, password);

      if (result.success) {
        toast.success(result.success);
        router.push(`/brand`);
      } else {
        toast.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues("email");

    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    setIsResetting(true);
    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error("Failed to send password reset email.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-600">
            Brand Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Form {...form}>
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>

            {/* Forgot Password Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-blue-400 hover:text-blue-500"
                disabled={isResetting}
              >
                {isResetting ? "Sending email..." : "Forgot Password?"}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging In...</span>
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandAuthLogin;
