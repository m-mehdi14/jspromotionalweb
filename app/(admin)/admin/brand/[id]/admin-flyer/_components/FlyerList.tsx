import React from "react";
import { Button } from "@/components/ui/button";
import { Flyer } from "../../admin-store/_components/types";

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
    return <div className="text-center">Loading flyers...</div>;
  }

  if (flyers.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No flyers found. Add a new flyer to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flyers.map((flyer) => (
        <div
          key={flyer.id}
          className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg"
        >
          <h2 className="text-lg font-bold mb-2">{flyer.title}</h2>
          <p className="text-sm text-gray-400">{flyer.description}</p>
          {flyer.image && (
            <img
              src={flyer.image}
              alt={flyer.title}
              className="mt-4 w-full h-auto rounded-md object-cover"
            />
          )}
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={() => onEdit(flyer)}>
              Edit
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
