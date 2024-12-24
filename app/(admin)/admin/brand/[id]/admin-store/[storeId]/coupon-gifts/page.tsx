import React from "react";
import AdminStoreCouponGifts from "./_components/coupon-gift";

interface AdminStoreDynamicPageProps {
  params: {
    id: string;
    storeId: string;
  };
}

const AdminStoreCouponGiftPage = async ({
  params,
}: AdminStoreDynamicPageProps) => {
  const { id, storeId } = await params;
  return (
    <div>
      <AdminStoreCouponGifts brandId={id} storeId={storeId} />
    </div>
  );
};

export default AdminStoreCouponGiftPage;
