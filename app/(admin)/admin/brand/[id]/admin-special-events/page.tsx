import React from "react";
import AdminSpecialEvents from "./_components/AdminSpecialEvents";

interface AdminSpecialEventsProps {
  params: {
    id: string;
  };
}

const AdminSepcialEventsPage = async ({ params }: AdminSpecialEventsProps) => {
  const { id } = await params;
  return (
    <div>
      <AdminSpecialEvents brandId={id} />
    </div>
  );
};

export default AdminSepcialEventsPage;
