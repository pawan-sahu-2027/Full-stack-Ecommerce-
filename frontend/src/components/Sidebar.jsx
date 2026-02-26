// import { isAction } from "@reduxjs/toolkit";
// import { LayoutDashboard, PackageSearch, Users } from "lucide-react";
// import React from "react";

// const Sidebar = () => {
//   return (
//     <div className="hidden fixed md:block border-r bg-pink-50 border-pink-200 x-10 w-[300px] p-10 space-y-2 h-screen">
//       <div className="text-center pt-10 px-3 space-y-2">
//         <NavLink
//           to="/dashboard/sales"
//           className={({ isActive }) =>
//             `text-xl flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full ${
//               isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"
//             }`
//           }
//         >
//           <LayoutDashboard />
//           <span>Dashboard</span>
//         </NavLink>



//           <NavLink
//           to="/dashboard/add-product"
//           className={({ isActive }) =>
//             `text-xl flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full ${
//               isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"
//             }`
//           }
//         >
//           <PackageSearch />
//             <span>Add Product</span>
//             </NavLink>


            
//           <NavLink
//           to="/dashboard/products"
//           className={({ isActive }) =>
//             `text-xl flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full ${
//               isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"
//             }`
//           }
//         >
//           <LayoutDashboard />
//             <span>Products</span>
//             </NavLink>




            
//           <NavLink
//           to="/dashboard/add-users"
//           className={({ isActive }) =>
//             `text-xl flex items-center gap-2 font-bold cursor-pointer p-3 rounded-2xl w-full ${
//               isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"
//             }`
//           }
//         >
//           <Users/>
//             <span>Add User</span>
//             </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PackageSearch, Users } from "lucide-react";
import { FaRegEdit } from "react-icons/fa";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `text-xl flex items-center gap-3 font-bold cursor-pointer p-3 rounded-2xl w-full transition ${
      isActive
        ? "bg-pink-600 text-gray-200"
        : "text-gray-700 hover:bg-pink-100"
    }`;

  return (
    <div className="hidden fixed md:block border-r bg-pink-50 border-pink-200 px-10 w-[300px] p-10 space-y-2 h-screen">
      <div className="text-center pt-10 px-3 space-y-2">
        
        <NavLink to="/dashboard/sales" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/add-product" className={linkClasses}>
          <PackageSearch className="w-5 h-5" />
          <span>Add Product</span>
        </NavLink>

        <NavLink to="/dashboard/products" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          <span>Products</span>
        </NavLink>

        <NavLink to="/dashboard/users" className={linkClasses}>
          <Users className="w-5 h-5" />
          <span>Add User</span>
        </NavLink>

        <NavLink to="/dashboard/orders" className={linkClasses}>
          <FaRegEdit className="w-5 h-5" />
          <span>Orders</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;