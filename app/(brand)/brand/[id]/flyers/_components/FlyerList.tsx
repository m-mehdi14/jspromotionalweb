// "use client";

// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// interface Flyer {
//   id: string;
//   title: string;
//   description: string;
//   image?: string;
//   validFrom: string;
//   validTo: string;
// }

// interface FlyerListProps {
//   flyers: Flyer[];
//   isLoading: boolean;
//   onEdit: (flyer: Flyer) => void;
//   onDelete: (id: string) => void;
// }

// export const FlyerList: React.FC<FlyerListProps> = ({
//   flyers,
//   isLoading,
//   onEdit,
//   onDelete,
// }) => {
//   if (isLoading) {
//     return <div className="text-center">Loading flyers...</div>;
//   }

//   if (flyers.length === 0) {
//     return (
//       <div className="text-center text-gray-400">
//         No flyers found. Add a new one to get started!
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {flyers.map((flyer) => (
//         <div key={flyer.id} className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">{flyer.title}</h2>
//           <p>{flyer.description}</p>
//           <Image
//             src={flyer.image || "https://via.placeholder.com/128"}
//             alt={flyer.title}
//             layout="responsive"
//             width={700}
//             height={475}
//             className="mt-4 w-full rounded-md"
//           />

//           <p>
//             <strong>Valid From:</strong> {flyer.validFrom}
//           </p>
//           <p>
//             <strong>Valid To:</strong> {flyer.validTo}
//           </p>
//           <div className="flex justify-end mt-4 space-x-4">
//             <Button variant="secondary" onClick={() => onEdit(flyer)}>
//               Edit
//             </Button>
//             <Button variant="destructive" onClick={() => onDelete(flyer.id)}>
//               Delete
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter flyers based on search query
  const filteredFlyers = flyers.filter((flyer) =>
    [flyer.title, flyer.description]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredFlyers.length / itemsPerPage);
  const paginatedFlyers = filteredFlyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="text-center">Loading flyers...</div>;
  }

  if (filteredFlyers.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No flyers found matching your search query.
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse ">
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
                className={`border-b ${index % 2 === 0 ? "" : "bg-white"
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

                    <Edit className="w-4 h-4 mr-1" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(flyer.id)}
                  >

                    <Trash2 className="w-4 h-4 mr-1" />
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
