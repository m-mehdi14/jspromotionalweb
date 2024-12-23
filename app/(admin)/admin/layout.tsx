import React from "react";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="">{children}</div>
    </>
  );
};

export default AdminPageLayout;
