"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash } from "lucide-react";

interface Flyer {
  id: string;
  title: string;
  description: string;
  image?: string;
  validFrom: string;
  validTo: string;
}

interface FlyerListProps {
  flyers: Flyer[];
  isLoading: boolean;
  onEdit: (flyer: Flyer) => void;
  onDelete: (id: string) => void;
}

export const FlyerList: React.FC<FlyerListProps> = ({
  flyers,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(flyers.length / itemsPerPage);
  const paginatedFlyers = flyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="text-center">Loading flyers...</div>;
  }

  if (flyers.length === 0) {
    return <div className="text-center text-gray-400">No flyers found.</div>;
  }

  return (
    <div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Title
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Valid From
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Valid To
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedFlyers.map((flyer, index) => (
              <tr
                key={flyer.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">
                  <Image
                    src={flyer.image || "https://via.placeholder.com/128"}
                    alt={flyer.title}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{flyer.title}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {flyer.description}
                </td>
                <td className="px-4 py-2">{flyer.validFrom}</td>
                <td className="px-4 py-2">{flyer.validTo}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button variant="secondary" onClick={() => onEdit(flyer)}>
                    {/* Edit */}
                    <PencilIcon />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(flyer.id)}
                  >
                    {/* Delete */}
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
