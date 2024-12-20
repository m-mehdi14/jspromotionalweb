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
    <div className="min-h-screen text-black bg-neutral-200 p-8">
      <h1 className="text-3xl font-bold mb-4">
        Admin Store Page for Brand ID: {id}
      </h1>
      <AdminFlyers brandId={id} />
    </div>
  );
};

export default AdminStorePage;
