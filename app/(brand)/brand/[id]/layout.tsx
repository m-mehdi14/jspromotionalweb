import React from "react";
import { Sidebar } from "../_components/Sidebar";
import { Container } from "../_components/Container";

const BrandPageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
};

export default BrandPageLayout;
