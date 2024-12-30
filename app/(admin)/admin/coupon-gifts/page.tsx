import React from "react";
import { CouponGiftsComponent } from "./_components/coupon-gifts";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminCouponGiftsPage = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <CouponGiftsComponent />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminCouponGiftsPage;
