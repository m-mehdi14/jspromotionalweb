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
  brandId: string;
  brandName?: string;
  storeId: string;
  storeName?: string;
  title: string;
  description: string;
  image: string | null;
  validFrom: string;
  validTo: string;
  createdAt: string;
  type: "flyer" | "storeFlyer";
}

export const FlyersComponent = () => {
  const [brandFlyers, setBrandFlyers] = useState<Flyer[]>([]);
  const [storeFlyers, setStoreFlyers] = useState<Flyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [brandSearch, setBrandSearch] = useState<string>("");
  const [storeSearch, setStoreSearch] = useState<string>("");

  // Pagination States
  const [brandFlyersPage, setBrandFlyersPage] = useState<number>(1);
  const [storeFlyersPage, setStoreFlyersPage] = useState<number>(1);
  const flyersPerPage = 5;

  useEffect(() => {
    const loadFlyers = async () => {
      setLoading(true);
      const response = await fetchAllFlyersAndStoreFlyers();
      if (response.success) {
        const flyers: Flyer[] = response.data || [];
        setBrandFlyers(flyers.filter((flyer) => flyer.type === "flyer"));
        setStoreFlyers(flyers.filter((flyer) => flyer.type === "storeFlyer"));
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    loadFlyers();
  }, []);

  const paginateFlyers = (flyers: Flyer[], page: number): Flyer[] => {
    const startIndex = (page - 1) * flyersPerPage;
    return flyers.slice(startIndex, startIndex + flyersPerPage);
  };

  const renderTable = (
    flyers: Flyer[],
    type: "brandFlyers" | "storeFlyers"
  ) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          {type === "brandFlyers" ? (
            <TableHead>Brand Name</TableHead>
          ) : (
            <TableHead>Store Name</TableHead>
          )}
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
            {type === "brandFlyers" ? (
              <TableCell>{flyer.brandName || "N/A"}</TableCell>
            ) : (
              <TableCell>{flyer.storeName || "N/A"}</TableCell>
            )}
            <TableCell>{flyer.validFrom}</TableCell>
            <TableCell>{flyer.validTo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderFlyersTab = (
    type: "brandFlyers" | "storeFlyers",
    flyers: Flyer[],
    searchValue: string,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => (
    <TabsContent value={type}>
      <div className="mb-4 flex justify-start">
        <input
          type="text"
          placeholder={`Search ${
            type === "brandFlyers" ? "Brand" : "Store"
          } Flyers...`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-72 px-4 py-2 border rounded-md"
        />
      </div>
      {flyers.length > 0 ? (
        <>
          {renderTable(
            paginateFlyers(
              flyers.filter((flyer) =>
                flyer.title.toLowerCase().includes(searchValue.toLowerCase())
              ),
              page
            ),
            type
          )}
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              variant="secondary"
            >
              Previous
            </Button>
            <span className="text-gray-700">
              Page {page} of {Math.ceil(flyers.length / flyersPerPage)}
            </span>
            <Button
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, Math.ceil(flyers.length / flyersPerPage))
                )
              }
              disabled={page === Math.ceil(flyers.length / flyersPerPage)}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No {type === "brandFlyers" ? "Brand" : "Store"} Flyers Found
        </p>
      )}
    </TabsContent>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white bg-black rounded-md p-7 mb-6">
        Flyers
      </h1>
      <Tabs defaultValue="brandFlyers" className="w-full">
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
            {renderFlyersTab(
              "brandFlyers",
              brandFlyers,
              brandSearch,
              setBrandSearch,
              brandFlyersPage,
              setBrandFlyersPage
            )}
            {renderFlyersTab(
              "storeFlyers",
              storeFlyers,
              storeSearch,
              setStoreSearch,
              storeFlyersPage,
              setStoreFlyersPage
            )}
          </>
        )}
      </Tabs>
    </div>
  );
};
