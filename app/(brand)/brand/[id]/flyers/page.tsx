import React from "react";
import BrandFlyers from "./_components/brand-flyers";

interface BrandFlyersPageProps {
  params: {
    id: string;
  };
}

const BrandFlyersPage = async ({ params }: BrandFlyersPageProps) => {
  const { id } = await params;
  return (
    <div>
      <BrandFlyers brandId={id} />
    </div>
  );
};

export default BrandFlyersPage;
