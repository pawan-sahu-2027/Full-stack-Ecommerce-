import OrderCard from "@/components/OrderCard";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const ShowUsersOrders = () => {
  const params = useParams();
  const [userOrder, setUserOrder] = React.useState([]);
  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(
      `http://localhost:8000/api/v1/orders/user-order/${params.userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (res.data.success) {
      setUserOrder(res.data.orders || []);
    }
  };

  useEffect (() => {
    getUserOrders();
   
  }, [])
    // console.log("User Orders:", userOrder);
  return (
    <>
      <OrderCard userOrder={userOrder} />
    </>
  );
};

export default ShowUsersOrders;
  //  import React from 'react'
   
  //  function ShowUsersOrders() {
  //    return (
  //      <div>ShowUsersOrders</div>
  //    )
  //  }
   
  //  export default ShowUsersOrders