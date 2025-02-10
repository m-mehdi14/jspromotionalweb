// "use client";

// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// interface SpecialEvent {
//   id: string;
//   name: string;
//   description: string;
//   image?: string;
//   startDate: string;
//   endDate: string;
// }

// interface SpecialEventListProps {
//   events: SpecialEvent[];
//   isLoading: boolean;
//   onEdit: (event: SpecialEvent) => void;
//   onDelete: (id: string) => void;
// }

// export const SpecialEventList: React.FC<SpecialEventListProps> = ({
//   events,
//   isLoading,
//   onEdit,
//   onDelete,
// }) => {
//   if (isLoading) {
//     return <div className="text-center">Loading events...</div>;
//   }

//   if (events.length === 0) {
//     return (
//       <div className="text-center text-gray-400">
//         No events found. Add a new one to get started!
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {events.map((event) => (
//         <div key={event.id} className="bg-white p-4 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold">{event.name}</h2>
//           <p>{event.description}</p>
//           <Image
//             src={event.image || "https://via.placeholder.com/128"}
//             alt={event.name}
//             className="mt-4 w-full rounded-md"
//             layout="responsive"
//             width={700}
//             height={475}
//           />
//           <p>
//             <strong>Start Date:</strong> {event.startDate}
//           </p>
//           <p>
//             <strong>End Date:</strong> {event.endDate}
//           </p>
//           <div className="flex justify-end mt-4 space-x-4">
//             <Button variant="secondary" onClick={() => onEdit(event)}>
//               Edit
//             </Button>
//             <Button variant="destructive" onClick={() => onDelete(event.id)}>
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

interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  image?: string;
  startDate: string;
  endDate: string;
}

interface SpecialEventListProps {
  events: SpecialEvent[];
  isLoading: boolean;
  onEdit: (event: SpecialEvent) => void;
  onDelete: (id: string) => void;
}

export const SpecialEventList: React.FC<SpecialEventListProps> = ({
  events,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter events based on the search query
  const filteredEvents = events.filter((event) => {
    const name = event.name.toLowerCase();
    const description = event.description.toLowerCase();

    return (
      name.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No events found matching your search query.
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Image
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Start Date
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                End Date
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedEvents.map((event, index) => (
              <tr
                key={event.id}
                className={`border-b ${index % 2 === 0 ? "" : "bg-white"
                  }`}
              >
                <td className="px-4 py-2">
                  <Image
                    src={event.image || "https://via.placeholder.com/128"}
                    alt={event.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{event.name}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {event.description}
                </td>
                <td className="px-4 py-2">
                  {new Date(event.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2">
                  {new Date(event.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button variant="secondary" onClick={() => onEdit(event)}>

                    <Edit className="w-4 h-4 mr-1" />
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(event.id)}
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
