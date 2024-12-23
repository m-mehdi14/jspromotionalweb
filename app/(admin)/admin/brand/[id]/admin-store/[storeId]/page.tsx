import React from "react";
import AdminStore from "./_components/store";

interface AdminStoreDynamicPageProps {
  params: {
    id: string;
    storeId: string;
  };
}

const AdminStoreDynamicPage = async ({
  params,
}: AdminStoreDynamicPageProps) => {
  const { id, storeId } = await params;
  return (
    <div className=" ">
      <AdminStore brandId={id} storeId={storeId} />
    </div>
  );
};

export default AdminStoreDynamicPage;
