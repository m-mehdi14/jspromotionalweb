import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import React from "react";

const BrandPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider
      defaultOpen={defaultOpen}
      className=" bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]"
    >
      <AppSidebar />
      <main className=" w-full">
        <SidebarTrigger className=" bg-white/80 text-black" />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default BrandPageLayout;
