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
//     return <div className="text-center text-gray-400">No flyers found.</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {flyers.map((flyer) => (
//         <div key={flyer.id} className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold">{flyer.title}</h2>
//           <p>{flyer.description}</p>
//           <Image
//             src={flyer.image || "https://via.placeholder.com/128"}
//             alt={flyer.title}
//             className="w-full rounded-md mt-4"
//             layout="responsive"
//             width={700}
//             height={475}
//           />
//           <p>
//             <strong>Valid From:</strong> {flyer.validFrom}
//           </p>
//           <p>
//             <strong>Valid To:</strong> {flyer.validTo}
//           </p>
//           <div className="flex justify-end space-x-4 mt-4">
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

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  if (isLoading) {
    return <div className="text-center">Loading flyers...</div>;
  }

  if (flyers.length === 0) {
    return <div className="text-center text-gray-400">No flyers found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Image</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Title</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Description</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Valid From</th>
            <th className="px-4 py-2 text-left text-gray-600 font-medium">Valid To</th>
            <th className="px-4 py-2 text-center text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {flyers.map((flyer, index) => (
            <tr
              key={flyer.id}
              className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
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
              <td className="px-4 py-2 truncate max-w-xs">{flyer.description}</td>
              <td className="px-4 py-2">{flyer.validFrom}</td>
              <td className="px-4 py-2">{flyer.validTo}</td>
              <td className="px-4 py-2 flex justify-center space-x-2">
                <Button variant="secondary" onClick={() => onEdit(flyer)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(flyer.id)}>
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
