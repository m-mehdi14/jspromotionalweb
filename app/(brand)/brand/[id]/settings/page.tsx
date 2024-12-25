import React from "react";
import BrandSettings from "./_components/brand-settings";

interface BrandSettingPageProps {
  params: {
    id: string;
  };
}

const BrandSettingPage = async ({ params }: BrandSettingPageProps) => {
  const { id } = await params;
  return (
    <div>
      <BrandSettings brandId={id} />
    </div>
  );
};

export default BrandSettingPage;
