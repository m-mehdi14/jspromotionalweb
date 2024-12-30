import React from "react";
import BrandSettings from "./_components/brand-settings";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

interface BrandSettingPageProps {
  params: {
    id: string;
  };
}

const BrandSettingPage = async ({ params }: BrandSettingPageProps) => {
  const { id } = await params;
  return (
    <div>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <BrandSettings brandId={id} />
      </RoleBasedRoute>
    </div>
  );
};

export default BrandSettingPage;
