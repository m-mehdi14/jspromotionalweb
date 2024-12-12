import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";
import React from "react";
import { StoreMainPage } from "./_components/store-comp";

const StorePage = () => {
  return (
    <>
      <RoleBasedRoute allowedRoles={["store"]}>
        <div className="">
          <StoreMainPage />
        </div>
      </RoleBasedRoute>
    </>
  );
};

export default StorePage;
