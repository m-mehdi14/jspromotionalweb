import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Flyer } from "../../admin-store/_components/types";
import { Skeleton } from "@/components/ui/skeleton";

export const FlyerList = ({
  flyers,
  isLoading,
  onEdit,
}: {
  flyers: Flyer[];
  isLoading: boolean;
  onEdit: (flyer: Flyer) => void;
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 rounded-lg p-5 shadow-md animate-pulse"
          >
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-6" />
            <Skeleton className="h-52 w-full rounded-md" />
            <div className="mt-4 flex justify-end">
              <Skeleton className="h-8 w-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (flyers.length === 0) {
    return (
      <div className="text-center text-gray-400 text-lg">
        No flyers found. Add a new flyer to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {flyers.map((flyer) => (
        <div
          key={flyer.id}
          className="bg-gray-600 rounded-lg p-5 shadow-md hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            {flyer.title}
          </h2>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {flyer.description}
          </p>
          {flyer.image && (
            <div className="relative w-full h-52 rounded-md overflow-hidden shadow-inner">
              <Image
                src={flyer.image}
                alt={flyer.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
            </div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-white px-2 py-1 rounded">
              Last Updated:{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(flyer.createdAt))}
            </span>

            <Button
              variant="secondary"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all"
              onClick={() => onEdit(flyer)}
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
