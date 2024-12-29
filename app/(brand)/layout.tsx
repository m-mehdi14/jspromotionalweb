import React from "react";
import { Sidebar } from "./brand/_components/Sidebar";
import { Container } from "./Container";

const BrandLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="">
                <Sidebar />
                <Container>{children}</Container>
            </div>
        </>
    );
};

export default BrandLayout;
