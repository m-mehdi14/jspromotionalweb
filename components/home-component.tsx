"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";

export const HomeComponent = () => {
  const { handleLogout, user } = useAuth();
  console.log("🚀 ~ HomeComponent ~ user:", user);
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};
