import { fetchAllFlyersAndStoreFlyers } from "@/actions/admin/flyers/fetch-flyers";
import { FlyersComponent } from "./_components/flyers";
import { RoleBasedRoute } from "@/lib/AuthContext/Role-based-Routes";

const AdminFlyersPage = async () => {
  const flyers = await fetchAllFlyersAndStoreFlyers(); // Fetch flyers from Firestore

  return (
    <div>
      <RoleBasedRoute allowedRoles={["admin"]}>
        <FlyersComponent
          // @ts-expect-error ignore
          flyers={flyers}
        />
      </RoleBasedRoute>
    </div>
  );
};

export default AdminFlyersPage;
