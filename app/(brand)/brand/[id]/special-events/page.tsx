import React from "react";
import BrandSpecialEvents from "./_components/brand-special-events";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

interface BrandSpecialEventsPageProps {
  params: {
    id: string;
  };
}

const BrandSpecialEventsPage = async ({
  params,
}: BrandSpecialEventsPageProps) => {
  const { id } = await params;
  return (
    <div>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <BrandSpecialEvents brandId={id} />
      </RoleBasedRoute>
    </div>
  );
};

export default BrandSpecialEventsPage;
