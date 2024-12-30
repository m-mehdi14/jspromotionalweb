import React from "react";
import StoreCouponGifts from "./_components/store-coupons";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const StoreCouponGiftsPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["store"]}>
        <StoreCouponGifts />
      </RoleBasedRoute>
    </div>
  );
};

export default StoreCouponGiftsPage;
