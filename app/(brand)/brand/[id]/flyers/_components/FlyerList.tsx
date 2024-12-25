"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export const FlyerList = ({ flyers, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <div className="text-center">Loading flyers...</div>;
  }

  if (flyers.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No flyers found. Add a new one to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flyers.map((flyer) => (
        <div key={flyer.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{flyer.title}</h2>
          <p>{flyer.description}</p>
          {flyer.image && (
            <img
              src={flyer.image}
              alt={flyer.title}
              className="mt-4 w-full rounded-md"
            />
          )}
          <p>
            <strong>Valid From:</strong> {flyer.validFrom}
          </p>
          <p>
            <strong>Valid To:</strong> {flyer.validTo}
          </p>
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="secondary" onClick={() => onEdit(flyer)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(flyer.id)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
