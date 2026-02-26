

import React, { useEffect, useState } from "react";

import axios from "axios";
import OrderCard from "@/components/OrderCard";

const MyOrder = () => {
  
  const [userOrder, setUserOrder] = useState([]);

  const getUserOrders = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
         
      const res = await axios.get(
        "http://localhost:8000/api/v1/orders/myorder",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
            console.log("User Orders:", res.data.orders);
      if (res.data.success) {
        setUserOrder(res.data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  console.log("User Orders State:", userOrder);

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <>
      <OrderCard userOrder={userOrder}/>
    </>
  );
};

export default MyOrder;