import React from "react";
import AdminCouponGifts from "./_components/AdminCouponGifts";

interface AdminCouponGiftPageProps {
  params: {
    id: string;
  };
}

const AdminCouponGiftPage = async ({ params }: AdminCouponGiftPageProps) => {
  const { id } = await params;
  return (
    <div className=" p-8">
      <AdminCouponGifts brandId={id} />
    </div>
  );
};

export default AdminCouponGiftPage;
