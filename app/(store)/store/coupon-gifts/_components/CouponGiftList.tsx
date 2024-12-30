// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// interface Coupon {
//   id: string;
//   name: string;
//   description: string;
//   image?: string;
//   code: string;
//   discount: string;
//   startDate: string;
//   endDate: string;
// }

// interface CouponGiftListProps {
//   coupons: Coupon[];
//   isLoading: boolean;
//   onEdit: (coupon: Coupon) => void;
//   onDelete: (id: string) => void;
// }

// export const CouponGiftList: React.FC<CouponGiftListProps> = ({
//   coupons,
//   isLoading,
//   onEdit,
//   onDelete,
// }) => {
//   if (isLoading) {
//     return <div className="text-center">Loading coupon gifts...</div>;
//   }

//   if (coupons.length === 0) {
//     return (
//       <div className="text-center text-gray-400">No coupon gifts found.</div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {coupons.map((coupon) => (
//         <div key={coupon.id} className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold">{coupon.name}</h2>
//           <p className="text-gray-500">{coupon.description}</p>
//           {coupon.image && (
//             <Image
//               src={coupon.image}
//               alt={coupon.name}
//               width={200}
//               height={200}
//               className="w-full h-auto mt-4 rounded-md"
//             />
//           )}
//           <p>
//             <strong>Code:</strong> {coupon.code}
//           </p>
//           <p>
//             <strong>Discount:</strong> {coupon.discount}
//           </p>
//           <p>
//             <strong>Valid From:</strong> {coupon.startDate}
//           </p>
//           <p>
//             <strong>Valid To:</strong> {coupon.endDate}
//           </p>
//           <div className="flex justify-end space-x-4 mt-4">
//             <Button variant="secondary" onClick={() => onEdit(coupon)}>
//               Edit
//             </Button>
//             <Button variant="destructive" onClick={() => onDelete(coupon.id)}>
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
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Coupon {
  id: string;
  name: string;
  description: string;
  image?: string;
  code: string;
  discount: string;
  startDate: string;
  endDate: string;
}

interface CouponGiftListProps {
  coupons: Coupon[];
  isLoading: boolean;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
}

export const CouponGiftList: React.FC<CouponGiftListProps> = ({
  coupons,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(coupons.length / itemsPerPage);
  const paginatedCoupons = coupons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="text-center">Loading coupon gifts...</div>;
  }

  if (coupons.length === 0) {
    return (
      <div className="text-center text-gray-400">No coupon gifts found.</div>
    );
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
                Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Description
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Code
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-medium">
                Discount
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
            {paginatedCoupons.map((coupon, index) => (
              <tr
                key={coupon.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2">
                  {coupon.image ? (
                    <Image
                      src={coupon.image}
                      alt={coupon.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2">{coupon.name}</td>
                <td className="px-4 py-2 truncate max-w-xs">
                  {coupon.description}
                </td>
                <td className="px-4 py-2">{coupon.code}</td>
                <td className="px-4 py-2">{coupon.discount}</td>
                <td className="px-4 py-2">{coupon.startDate}</td>
                <td className="px-4 py-2">{coupon.endDate}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                  <Button variant="secondary" onClick={() => onEdit(coupon)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(coupon.id)}
                  >
                    Delete
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
