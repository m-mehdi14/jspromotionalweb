import React from "react";
import { AdminStore } from "./_components/admin-store";
import AdminFlyers from "./_components/admin-flyers";

interface AdminStorePageProps {
  params: {
    id: string; // Brand ID
  };
}

const AdminStorePage = async ({ params }: AdminStorePageProps) => {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        Admin Store Page for Brand ID: {id}
      </h1>
      <AdminStore brandId={id} />
      <AdminFlyers brandId={id} />
    </div>
  );
};

export default AdminStorePage;
