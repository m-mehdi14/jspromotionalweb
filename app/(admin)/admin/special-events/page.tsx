import React from "react";
import { SpecialEventsComponent } from "./_components/special-events";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminSpecialEvents = () => {
  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <SpecialEventsComponent />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminSpecialEvents;
