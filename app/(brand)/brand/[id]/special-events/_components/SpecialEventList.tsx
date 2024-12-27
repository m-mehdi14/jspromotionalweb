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

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (events.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No events found. Add a new one to get started!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Image</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Name</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Start Date</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">End Date</th>
            <th className="px-4 py-2 text-center text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={event.id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
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
              <td className="px-4 py-2 truncate max-w-xs">{event.description}</td>
              <td className="px-4 py-2">{event.startDate}</td>
              <td className="px-4 py-2">{event.endDate}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Button variant="secondary" onClick={() => onEdit(event)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(event.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

