import React from "react";
import BrandCouponGifts from "./_components/brand-coupon-gifts";

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
      <BrandCouponGifts brandId={id} />
    </div>
  );
};

export default BrandSpecificEventsPage;
