import { fetchAllFlyersAndStoreFlyers } from "@/actions/admin/flyers/fetch-flyers";
import { FlyersComponent } from "./_components/flyers";

const AdminFlyersPage = async () => {
  const flyers = await fetchAllFlyersAndStoreFlyers(); // Fetch flyers from Firestore

  return (
    <div>
      <FlyersComponent
        // @ts-expect-error ignore
        flyers={flyers}
      />
    </div>
  );
};

export default AdminFlyersPage;
