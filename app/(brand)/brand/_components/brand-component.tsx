"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import React from "react";

export const BrandComponents = () => {
  const { handleLogout } = useAuth();
  return (
    <div>
      <Button onClick={handleLogout}> Logout</Button>
    </div>
  );
};
