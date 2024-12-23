import React from "react";
import AdminStoreFlyers from "./_components/store-flyers";

interface AdminStoreFlyersPageProps {
  params: {
    id: string;
    storeId: string;
  };
}

const AdminStoreFlyersPage = async ({ params }: AdminStoreFlyersPageProps) => {
  const { id, storeId } = await params;
  return (
    <div>
      <AdminStoreFlyers brandId={id} storeId={storeId} />
    </div>
  );
};

export default AdminStoreFlyersPage;
