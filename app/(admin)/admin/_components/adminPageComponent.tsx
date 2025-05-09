// "use client";

// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/lib/AuthContext/authContext";
// import {
//   FaHome,
//   FaBoxes,
//   FaUsers,
//   FaUtensils,
//   FaShoppingCart,
//   FaCalendarAlt,
//   FaCheckCircle,
// } from "react-icons/fa";
// import { IoIosLogOut } from "react-icons/io";

// interface Metric {
//   value: number | string;
//   label: string;
// }

// export const AdminPageComponent = ({ metrics }: { metrics: Metric[] }) => {
//   const { handleLogout, user } = useAuth();

//   const icons = [
//     <FaHome key="home" className="text-3xl text-gray-600" />,
//     <FaBoxes key="boxes" className="text-3xl text-gray-600" />,
//     <FaUsers key="users" className="text-3xl text-gray-600" />,
//     <FaUtensils key="utensils" className="text-3xl text-gray-600" />,
//     <FaShoppingCart key="shopping-cart" className="text-3xl text-gray-600" />,
//     <FaCalendarAlt key="calendar" className="text-3xl text-gray-600" />,
//     <FaCheckCircle key="check-circle" className="text-3xl text-gray-600" />,
//   ];

//   return (
//     <div className="min-h-screen bg-white text-black">
//       {/* Header Section */}
//       <header className="w-full items-center justify-between p-6">
//         <h1 className="text-2xl font-bold text-white bg-black rounded-md p-7 mb-10">
//           Admin Dashboard
//         </h1>
//         <div className="flex items-center space-x-4">
//           <p className="text-gray-600">Welcome, {user?.email || "Admin"}!</p>
//           <Button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center space-x-2"
//             title="Logout"
//           >
//             <IoIosLogOut className="text-xl" />
//           </Button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {metrics.map((metric, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
//             >
//               <div className="mr-4">{icons[index]}</div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {metric.value}
//                 </p>
//                 <p className="text-gray-500">{metric.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext/authContext";
import {
  FaHome,
  FaBoxes,
  FaUsers,
  FaUtensils,
  FaShoppingCart,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

interface Metric {
  value: number | string;
  label: string;
}

export const AdminPageComponent = ({ metrics }: { metrics: Metric[] }) => {
  const { handleLogout, user } = useAuth();

  const icons = [
    <FaHome key="home" className="text-3xl text-gray-600" />,
    <FaBoxes key="boxes" className="text-3xl text-gray-600" />,
    <FaUsers key="users" className="text-3xl text-gray-600" />,
    <FaUtensils key="utensils" className="text-3xl text-gray-600" />,
    <FaShoppingCart key="shopping-cart" className="text-3xl text-gray-600" />,
    <FaCalendarAlt key="calendar" className="text-3xl text-gray-600" />,
    <FaCheckCircle key="check-circle" className="text-3xl text-gray-600" />,
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <header className="w-full flex justify-between items-center px-6">
        <div className="relative w-full mt-5">
          <h1 className="text-2xl font-bold text-white bg-black rounded-md p-6 flex justify-between items-center">
            Admin Dashboard
            <div className="flex items-center space-x-4">
              <p className="text-gray-300">Welcome, {user?.email || "Admin"}!</p>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center space-x-2"
                title="Logout"
              >
                <IoIosLogOut className="text-xl" />
              </Button>
            </div>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="mr-4">{icons[index]}</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </p>
                <p className="text-gray-500">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
