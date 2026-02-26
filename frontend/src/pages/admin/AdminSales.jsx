// import axios from "axios";
// import { Card, CardHeader } from "@/components/ui/card";
// import React from "react";
// import { useEffect } from "react";
// import { CardTitle, CardContent } from "@/components/ui/card";
// import { Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
// import { AreaChart } from "lucide-react";

// function AdminSales() {
//   const [stats, setStats] = React.useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalSales: 0,
//     salesByData: [],
//   });

//   const fetchStats = async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const res = await axios("http://localhost:8000/api/v1/orders/sales", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (res.data.success) {
//         setStats(res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching sales data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);
//   return (
//     <div className="pl-[350px] bg-gray-100 py-20 pr-20 mx-auto px-4 ">
//       <div className="p-6 grid gap-6 lg:grid-cols-4 flex">
//         <Card className="bg-pink-500 text-white shadow">
//           <CardHeader>
//             <CardTitle>Total Users: </CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             {stats.totalUsers}
//           </CardContent>
//         </Card>

//         <Card className="bg-pink-500 text-white shadow">
//           <CardHeader>
//             <CardTitle>Total Products: </CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             {stats.totalProducts}
//           </CardContent>
//         </Card>

//         <Card className="bg-pink-500 text-white shadow">
//           <CardHeader>
//             <CardTitle>Total Orders: </CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             {stats.totalOrders}
//           </CardContent>
//         </Card>

//         <Card className="bg-pink-500 text-white shadow">
//           <CardHeader>
//             <CardTitle>Total Sales: </CardTitle>
//           </CardHeader>
//           <CardContent className="text-2xl font-bold">
//             {stats.totalSales}
//           </CardContent>
//         </Card>

//         {/* sales chart */}

//         <Card className="lg:col-span-4">
//           <CardHeader>
//             <CardTitle>Sales last 30 days</CardTitle>
//           </CardHeader>

//           <CardContent style={{ height: "300px" }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={stats.sales}></AreaChart>

//               <AreaChart data="data">
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="amount"
//                   stroke="#F472B6"
//                   fill="#F472B6"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default AdminSales;
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AdminSales() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    salesByDate: [],
  });

  const fetchStats = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/orders/sales",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="pl-[350px] bg-gray-100 py-20 pr-20 mx-auto">
      <div className="p-6 grid  grid-cols-4 gap-6">
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalUsers}
          </CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalProducts}
          </CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {stats.totalOrders}
          </CardContent>
        </Card>

        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            ₹{stats.totalSales}
          </CardContent>
        </Card>

        {/* Sales Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales last 30 days</CardTitle>
          </CardHeader>

          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.salesByDate}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#F472B6"
                  fill="#F472B6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminSales;