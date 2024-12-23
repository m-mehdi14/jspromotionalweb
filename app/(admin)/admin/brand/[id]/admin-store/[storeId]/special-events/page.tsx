import React from "react";
import AdminStoreSpecialEvents from "./_components/store-special-events";

interface AdminStoreDynamicPageProps {
  params: {
    id: string;
    storeId: string;
  };
}

const AdminStoreSpecialEventsPage = async ({
  params,
}: AdminStoreDynamicPageProps) => {
  const { id, storeId } = await params;
  return (
    <div>
      <AdminStoreSpecialEvents brandId={id} storeId={storeId} />
    </div>
  );
};

export default AdminStoreSpecialEventsPage;
