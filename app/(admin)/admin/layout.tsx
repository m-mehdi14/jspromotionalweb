import React from "react";
import { Sidebar } from "./_components/Sidebar";
import { Container } from "./_components/Container";

const AdminPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default AdminPageLayout;
