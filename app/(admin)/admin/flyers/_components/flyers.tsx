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
import Image from "next/image";

export const FlyersComponent = () => {
  const [brandFlyers, setBrandFlyers] = useState([]);
  const [storeFlyers, setStoreFlyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlyers = async () => {
      setLoading(true);
      const response = await fetchAllFlyersAndStoreFlyers();
      if (response.success) {
        const flyers = response.data;
        // @ts-expect-error ignore
        setBrandFlyers(flyers?.filter((flyer) => flyer?.type === "flyer"));
        // @ts-expect-error ignore
        setStoreFlyers(flyers?.filter((flyer) => flyer?.type === "storeFlyer"));
      } else {
        console.error(response.error);
      }
      setLoading(false);
    };

    loadFlyers();
  }, []);
  // @ts-expect-error ignore
  const renderTable = (flyers) => (
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
        {flyers.map(
          // @ts-expect-error ignore
          (flyer) => (
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
          )
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Flyers</h1>
      <Tabs defaultValue="brandFlyers" className="w-full">
        {/* Tab List */}
        <TabsList className="flex justify-start items-center mb-6 py-6 px-3">
          <TabsTrigger value="brandFlyers">Brand Flyers</TabsTrigger>
          <TabsTrigger value="storeFlyers">Store Flyers</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        {loading ? (
          <div className="flex flex-col  items-center h-full space-y-3">
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
          </div>
        ) : (
          <>
            <TabsContent value="brandFlyers">
              {brandFlyers.length > 0 ? (
                renderTable(brandFlyers)
              ) : (
                <p className="text-center text-gray-500">
                  No Brand Flyers Found
                </p>
              )}
            </TabsContent>
            <TabsContent value="storeFlyers">
              {storeFlyers.length > 0 ? (
                renderTable(storeFlyers)
              ) : (
                <p className="text-center text-gray-500">
                  No Store Flyers Found
                </p>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};
