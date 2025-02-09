// "use client";

// import React, { useEffect, useState } from "react";
// import { fetchAllFlyersAndStoreFlyers } from "@/actions/admin/flyers/fetch-flyers";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export const FlyersComponent = () => {
//   const [brandFlyers, setBrandFlyers] = useState([]);
//   const [storeFlyers, setStoreFlyers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination States for Brand Flyers
//   const [brandFlyersPage, setBrandFlyersPage] = useState(1);
//   const brandFlyersPerPage = 5;

//   // Pagination States for Store Flyers
//   const [storeFlyersPage, setStoreFlyersPage] = useState(1);
//   const storeFlyersPerPage = 5;

//   useEffect(() => {
//     const loadFlyers = async () => {
//       setLoading(true);
//       const response = await fetchAllFlyersAndStoreFlyers();
//       if (response.success) {
//         const flyers = response.data;
//         setBrandFlyers(
//           // @ts-expect-error ignore
//           flyers?.filter((flyer) => flyer?.type === "flyer") || []
//         );
//         setStoreFlyers(
//           // @ts-expect-error ignore
//           flyers?.filter((flyer) => flyer?.type === "storeFlyer") || []
//         );
//       } else {
//         console.error(response.error);
//       }
//       setLoading(false);
//     };

//     loadFlyers();
//   }, []);

//   // Pagination Logic
//   // @ts-expect-error ignore
//   const paginateFlyers = (flyers, page, itemsPerPage) => {
//     const startIndex = (page - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     return flyers.slice(startIndex, endIndex);
//   };
//   // @ts-expect-error ignore
//   const renderTable = (flyers) => (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Image</TableHead>
//           <TableHead>Title</TableHead>
//           <TableHead>Description</TableHead>
//           <TableHead>Brand/Store ID</TableHead>
//           <TableHead>Valid From</TableHead>
//           <TableHead>Valid To</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {flyers.map(
//           (
//             // @ts-expect-error ignore
//             flyer
//           ) => (
//             <TableRow key={flyer.id}>
//               <TableCell>
//                 <div className="w-16 h-16 rounded overflow-hidden">
//                   <Image
//                     src={flyer.image || "https://via.placeholder.com/150"}
//                     alt={flyer.title}
//                     width={64}
//                     height={64}
//                     className="object-cover"
//                   />
//                 </div>
//               </TableCell>
//               <TableCell className="font-medium">{flyer.title}</TableCell>
//               <TableCell>{flyer.description}</TableCell>
//               <TableCell>{flyer.brandId || flyer.storeId || "N/A"}</TableCell>
//               <TableCell>{flyer.validFrom}</TableCell>
//               <TableCell>{flyer.validTo}</TableCell>
//             </TableRow>
//           )
//         )}
//       </TableBody>
//     </Table>
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-white bg-black rounded-md p-7 mb-6">Flyers</h1>
//       <Tabs defaultValue="brandFlyers" className="w-full">
//         {/* Tab List */}
//         <TabsList className="flex justify-start items-center mb-6 py-6 px-3">
//           <TabsTrigger value="brandFlyers">Brand Flyers</TabsTrigger>
//           <TabsTrigger value="storeFlyers">Store Flyers</TabsTrigger>
//         </TabsList>

//         {/* Tab Content */}
//         {loading ? (
//           <div className="flex flex-col items-center h-full space-y-3">
//             {[...Array(6)].map((_, index) => (
//               <Skeleton key={index} className="w-full h-12" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* Brand Flyers */}
//             <TabsContent value="brandFlyers">
//               {brandFlyers.length > 0 ? (
//                 <>
//                   {renderTable(
//                     paginateFlyers(
//                       brandFlyers,
//                       brandFlyersPage,
//                       brandFlyersPerPage
//                     )
//                   )}
//                   {/* Pagination */}
//                   <div className="flex justify-between items-center mt-4">
//                     <Button
//                       onClick={() =>
//                         setBrandFlyersPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={brandFlyersPage === 1}
//                       variant="secondary"
//                     >
//                       Previous
//                     </Button>
//                     <span className="text-gray-700">
//                       Page {brandFlyersPage} of{" "}
//                       {Math.ceil(brandFlyers.length / brandFlyersPerPage)}
//                     </span>
//                     <Button
//                       onClick={() =>
//                         setBrandFlyersPage((prev) =>
//                           Math.min(
//                             prev + 1,
//                             Math.ceil(brandFlyers.length / brandFlyersPerPage)
//                           )
//                         )
//                       }
//                       disabled={
//                         brandFlyersPage ===
//                         Math.ceil(brandFlyers.length / brandFlyersPerPage)
//                       }
//                       variant="secondary"
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No Brand Flyers Found
//                 </p>
//               )}
//             </TabsContent>

//             {/* Store Flyers */}
//             <TabsContent value="storeFlyers">
//               {storeFlyers.length > 0 ? (
//                 <>
//                   {renderTable(
//                     paginateFlyers(
//                       storeFlyers,
//                       storeFlyersPage,
//                       storeFlyersPerPage
//                     )
//                   )}
//                   {/* Pagination */}
//                   <div className="flex justify-between items-center mt-4">
//                     <Button
//                       onClick={() =>
//                         setStoreFlyersPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={storeFlyersPage === 1}
//                       variant="secondary"
//                     >
//                       Previous
//                     </Button>
//                     <span className="text-gray-700">
//                       Page {storeFlyersPage} of{" "}
//                       {Math.ceil(storeFlyers.length / storeFlyersPerPage)}
//                     </span>
//                     <Button
//                       onClick={() =>
//                         setStoreFlyersPage((prev) =>
//                           Math.min(
//                             prev + 1,
//                             Math.ceil(storeFlyers.length / storeFlyersPerPage)
//                           )
//                         )
//                       }
//                       disabled={
//                         storeFlyersPage ===
//                         Math.ceil(storeFlyers.length / storeFlyersPerPage)
//                       }
//                       variant="secondary"
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <p className="text-center text-gray-500">
//                   No Store Flyers Found
//                 </p>
//               )}
//             </TabsContent>
//           </>
//         )}
//       </Tabs>
//     </div>
//   );
// };


"use client";

import React, { useEffect, useState } from "react";
import { fetchAllFlyersAndStoreFlyers } from "@/actions/admin/flyers/fetch-flyers";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface Flyer {
  id: string;
  type: string;
  title: string;
  description: string;
  brandId?: string;
  storeId?: string;
  validFrom: string;
  validTo: string;
  image?: string;
}

export const FlyersComponent = () => {
  const [brandFlyers, setBrandFlyers] = useState<Flyer[]>([]);
  const [storeFlyers, setStoreFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [brandSearch, setBrandSearch] = useState<string>("");
  const [storeSearch, setStoreSearch] = useState<string>("");

  // Pagination States
  const [brandFlyersPage, setBrandFlyersPage] = useState<number>(1);
  const brandFlyersPerPage = 5;

  const [storeFlyersPage, setStoreFlyersPage] = useState<number>(1);
  const storeFlyersPerPage = 5;

  useEffect(() => {
    const loadFlyers = async () => {
      setLoading(true);
      const response = await fetchAllFlyersAndStoreFlyers();
      if (response.success) {
        const flyers: Flyer[] = response.data || [];
        setBrandFlyers(flyers?.filter((flyer) => flyer?.type === "flyer") || []);
        setStoreFlyers(flyers?.filter((flyer) => flyer?.type === "storeFlyer") || []);
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    loadFlyers();
  }, []);

  const paginateFlyers = (flyers: Flyer[], page: number, itemsPerPage: number): Flyer[] => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return flyers.slice(startIndex, endIndex);
  };

  const renderTable = (flyers: Flyer[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Brand/Store ID</TableHead>
          <TableHead>Valid From</TableHead>
          <TableHead>Valid To</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flyers.map((flyer) => (
          <TableRow key={flyer.id}>
            <TableCell>
              <div className="w-16 h-16 rounded overflow-hidden">
                <Image
                  src={flyer.image || "https://via.placeholder.com/150"}
                  alt={flyer.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </TableCell>
            <TableCell className="font-medium">{flyer.title}</TableCell>
            <TableCell>{flyer.description}</TableCell>
            <TableCell>{flyer.brandId || flyer.storeId || "N/A"}</TableCell>
            <TableCell>{flyer.validFrom}</TableCell>
            <TableCell>{flyer.validTo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white bg-black rounded-md p-7 mb-6">
        Flyers
      </h1>
      <Tabs defaultValue="brandFlyers" className="w-full">
        {/* Tab List */}
        <TabsList className="flex justify-start items-center mb-6 py-6 px-3">
          <TabsTrigger value="brandFlyers">Brand Flyers</TabsTrigger>
          <TabsTrigger value="storeFlyers">Store Flyers</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex flex-col items-center h-full space-y-3">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="w-full h-12" />
            ))}
          </div>
        ) : (
          <>
            {/* Brand Flyers */}
            <TabsContent value="brandFlyers">
              <div className="mb-4 flex justify-start">
                <input
                  type="text"
                  placeholder="Search Brand Flyers..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-72 px-4 py-2 border rounded-md"
                />
              </div>
              {brandFlyers.length > 0 ? (
                <>
                  {renderTable(
                    paginateFlyers(
                      brandFlyers.filter((flyer) =>
                        flyer.title.toLowerCase().includes(brandSearch.toLowerCase())
                      ),
                      brandFlyersPage,
                      brandFlyersPerPage
                    )
                  )}
                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      onClick={() => setBrandFlyersPage((prev) => Math.max(prev - 1, 1))}
                      disabled={brandFlyersPage === 1}
                      variant="secondary"
                    >
                      Previous
                    </Button>
                    <span className="text-gray-700">
                      Page {brandFlyersPage} of {Math.ceil(brandFlyers.length / brandFlyersPerPage)}
                    </span>
                    <Button
                      onClick={() =>
                        setBrandFlyersPage((prev) =>
                          Math.min(prev + 1, Math.ceil(brandFlyers.length / brandFlyersPerPage))
                        )
                      }
                      disabled={brandFlyersPage === Math.ceil(brandFlyers.length / brandFlyersPerPage)}
                      variant="secondary"
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">No Brand Flyers Found</p>
              )}
            </TabsContent>

            {/* Store Flyers */}
            <TabsContent value="storeFlyers">
              <div className="mb-4 flex justify-start">
                <input
                  type="text"
                  placeholder="Search Store Flyers..."
                  value={storeSearch}
                  onChange={(e) => setStoreSearch(e.target.value)}
                  className="w-72 px-4 py-2 border rounded-md"
                />
              </div>
              {storeFlyers.length > 0 ? (
                <>
                  {renderTable(
                    paginateFlyers(
                      storeFlyers.filter((flyer) =>
                        flyer.title.toLowerCase().includes(storeSearch.toLowerCase())
                      ),
                      storeFlyersPage,
                      storeFlyersPerPage
                    )
                  )}
                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      onClick={() => setStoreFlyersPage((prev) => Math.max(prev - 1, 1))}
                      disabled={storeFlyersPage === 1}
                      variant="secondary"
                    >
                      Previous
                    </Button>
                    <span className="text-gray-700">
                      Page {storeFlyersPage} of {Math.ceil(storeFlyers.length / storeFlyersPerPage)}
                    </span>
                    <Button
                      onClick={() =>
                        setStoreFlyersPage((prev) =>
                          Math.min(prev + 1, Math.ceil(storeFlyers.length / storeFlyersPerPage))
                        )
                      }
                      disabled={storeFlyersPage === Math.ceil(storeFlyers.length / storeFlyersPerPage)}
                      variant="secondary"
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500">No Store Flyers Found</p>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
