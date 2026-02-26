import React from 'react'
// import { Button } from '@/component/ui/button'
import { Button } from "@/components/ui/button.jsx";
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const OrderCard = ({userOrder}) => {
    const navigate = useNavigate();
  return (
      <div className=" py-20 pr-20flex flex-col gap-3">
      <div className="w-full p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="rounded-full"
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>

        {userOrder.length === 0 ? (
          <p className="text-gray-500 text-xl">No orders found</p>
        ) : (
          <div className="space-y-6 w-full">
            {userOrder.map((order) => (
              <div
                key={order._id}
                className="shadow-lg rounded-2xl p-5 border border-gray-200"
              >
                {/* Order header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Order ID: {order._id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Amount:{" "}
                    <span className="font-bold">
                      {order.currency} {order.amount?.toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* User info */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">User:</span>{" "}
                      {order?.user?.firstName || "Unknown"}{" "}
                      {order?.user?.lastName || ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      Email: {order?.user?.email || "Unknown"}
                    </p>
                  </div>

                  <span
                    className={`${
                      order.status === "Paid"
                        ? "bg-green-500"
                        : order.status === "Failed"
                        ? "bg-red-500"
                        : "bg-orange-400"
                    } text-white px-3 py-1 rounded-lg text-sm`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Products */}
                <div>
                  <h3 className="font-medium mb-2">Products</h3>
                  <ul className="space-y-2">
                    {order.products?.filter(p => p.productId).map((product, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <img
                          onClick={() => navigate(`/products/${product?.productId}`)}
                          className="w-16"
                          src={product.productId?.productImg?.[0]?.url}
                          alt=""
                        />
                        <span className="w-[300px] line-clamp-2">
                          {product.productId?.productName}
                        </span>
                        <span className="font-medium">
                          ₹{product.productId?.productPrice} ×
                          {product.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderCard