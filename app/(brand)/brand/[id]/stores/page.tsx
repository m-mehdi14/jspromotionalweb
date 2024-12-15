import React from "react";
import { BrandStore } from "./_components/brand-store";

// Page for listing stores under a specific brand
interface BrandStoresPageProps {
  params: { id: string };
}

const BrandStoresPage = ({ params }: BrandStoresPageProps) => {
  return (
    <div className="text-white">
      <BrandStore brandId={params.id} />
    </div>
  );
};

export default BrandStoresPage;
