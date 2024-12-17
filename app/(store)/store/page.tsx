import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { StoreMainPage } from "./_components/store-comp";

const StorePage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["store"]}>
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
          <StoreMainPage />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default StorePage;
