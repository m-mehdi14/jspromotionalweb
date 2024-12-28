import React from "react";
import { AdminStore } from "./_components/admin-store";
// import AdminFlyers from "./_components/admin-flyers";

interface AdminStorePageProps {
  params: {
    id: string; // Brand ID
  };
}

const AdminStorePage = async ({ params }: AdminStorePageProps) => {
  const { id } = await params;

  return (
    <div className="min-h-screen text-black bg-neutral-50 p-8">
      <AdminStore brandId={id} />
      {/* <AdminFlyers brandId={id} /> */}
    </div>
  );
};

export default AdminStorePage;
