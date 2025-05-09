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
import {
  signInWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, db } from "@/config/firebase"; // Firebase app config
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

// Schema for form validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

// Function to validate if the user is an admin
const validateAdmin = async (email: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("email", "==", email),
      where("role", "==", "admin")
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Returns true if a matching document is found
  } catch (error) {
    console.error("Error validating admin:", error);
    return false;
  }
};

export const AdminAuthLogin = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false); // State for password reset

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true); // Disable fields and show loader
    const { email, password } = values;

    try {
      // Validate if the user is an admin
      const isAdmin = await validateAdmin(email);
      if (!isAdmin) {
        toast.error("You are not authorized to access this admin panel.");
        setIsSubmitting(false);
        return;
      }

      // Proceed with login if validation succeeds
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      form.reset(); // Clear form on success
      router.push("/admin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Login failed. Please try again.");
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false); // Re-enable fields and hide loader
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
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send password reset email.");
      }
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-600">
            Admin Login
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
              disabled={isSubmitting} // Disable during submission
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />{" "}
                  {/* Loader Icon */}
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

export default AdminAuthLogin;
