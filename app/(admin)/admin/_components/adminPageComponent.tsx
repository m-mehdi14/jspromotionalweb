"use client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import React from "react";

export const AdminPageComponent = () => {
  const { handleLogout } = useAuth();
  return (
    <div>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
};
