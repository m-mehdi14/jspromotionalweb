import React from "react";
import BrandFlyers from "./_components/brand-flyers";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

interface BrandFlyersPageProps {
  params: {
    id: string;
  };
}

const BrandFlyersPage = async ({ params }: BrandFlyersPageProps) => {
  const { id } = await params;
  return (
    <div>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <BrandFlyers brandId={id} />
      </RoleBasedRoute>
    </div>
  );
};

export default BrandFlyersPage;
