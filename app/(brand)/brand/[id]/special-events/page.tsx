import React from "react";
import BrandSpecialEvents from "./_components/brand-special-events";

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
      <BrandSpecialEvents brandId={id} />
    </div>
  );
};

export default BrandSpecialEventsPage;
