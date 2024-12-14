import React from "react";
import { AdminStore } from "./_components/admin-store";

interface AdminStorePageProps {
  params: {
    id: string; // Brand ID
  };
}

const AdminStorePage = ({ params }: AdminStorePageProps) => {
  const { id: brandId } = params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white p-8">
      <h1 className="text-3xl font-bold mb-4">
        Admin Store Page for Brand ID: {brandId}
      </h1>
      <AdminStore brandId={brandId} />
    </div>
  );
};

export default AdminStorePage;
