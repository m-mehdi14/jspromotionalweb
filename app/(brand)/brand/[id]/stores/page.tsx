import React from "react";
import { BrandStore } from "./_components/brand-store";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

// Page for listing stores under a specific brand
interface BrandStoresPageProps {
  params: { id: string };
}

const BrandStoresPage = ({ params }: BrandStoresPageProps) => {
  return (
    <div className="text-white">
      <RoleBasedRoute allowedRoles={["brand"]}>
        <BrandStore brandId={params.id} />
      </RoleBasedRoute>
    </div>
  );
};

export default BrandStoresPage;
