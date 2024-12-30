import React from "react";
import BrandCouponGifts from "./_components/brand-coupon-gifts";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

interface BrandSpecialEventsPageProps {
  params: {
    id: string;
  };
}

const BrandSpecificEventsPage = async ({
  params,
}: BrandSpecialEventsPageProps) => {
  const { id } = await params;
  return (
    <div>
      <RoleBasedRoute allowedRoles={["brand"]}>
        <BrandCouponGifts brandId={id} />
      </RoleBasedRoute>
    </div>
  );
};

export default BrandSpecificEventsPage;
