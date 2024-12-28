import React from "react";
import AdminFlyers from "../admin-store/_components/admin-flyers";

interface AdminStorePageProps {
  params: {
    id: string; // Brand ID
  };
}

const AdminStorePage = async ({ params }: AdminStorePageProps) => {
  const { id } = await params;

  return (
    <div className="min-h-screen text-black  p-8">
      <AdminFlyers brandId={id} />
    </div>
  );
};

export default AdminStorePage;
