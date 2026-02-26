
// this is the cart page where user can see the products added to cart and can update the quantity 
//  or remove the product from cart. User can also see the order summary and can place the order. 
// If the cart is empty then user will see a message that cart is empty and can continue shopping.
import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";
import { useEffect } from "react";
function Cart() {
  const { cart } = useSelector((store) => store.product);
  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 299 || subtotal === 0 ? 0 : 200;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  const navigate = useNavigate();
  const API = "http://localhost:8000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const handleUpdateQuantity = async (productId, type) => {
    // Implement quantity update logic here
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await axios.get(`${API}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {cart?.items?.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-7">
              Shopping Cart
            </h1>
            <div className="flex flex-col lg:flex-row gap-7">
              {/* Left Side: Cart Items */}
              <div className="flex flex-col gap-5 flex-1">
                {cart?.items?.map((product, index) => (
                  <Card key={index}>
                    <div className="flex justify-between items-center p-7">
                      <div className="flex items-center gap-4 w-[350px]">
                        <img
                          src={
                            product?.productId?.productImg?.[0]?.url ||
                            "/placeholder.png"
                          }
                          alt={product?.productId?.productName}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="w-[280px]">
                          <h1 className="font-semibold truncate">
                            {product?.productId?.productName}
                          </h1>
                          <p className="text-gray-600">
                            ₹{product?.productId?.productPrice}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-5 items-center">
                        <Button
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "decrease",
                            )
                          }
                          variant="outline"
                          size="sm"
                        >
                          -
                        </Button>
                        <span>{product.quantity}</span>
                        <Button
                          onClick={() =>
                            handleUpdateQuantity(
                              product.productId._id,
                              "increase",
                            )
                          }
                          variant="outline"
                          size="sm"
                        >
                          +
                        </Button>
                      </div>

                      <p className="font-semibold">
                        ₹
                        {(
                          (product?.productId?.productPrice || 0) *
                          product.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                      <button
                        onClick={() => handleRemove(product?.productId?._id)}
                        className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Right Side: Order Summary */}
              <div className="w-full lg:w-[400px]">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cart?.items?.length} items)</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-green-600" : ""}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>₹{tax.toLocaleString("en-IN")}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Promo code"
                          className="focus-visible:ring-pink-500"
                        />
                        <Button variant="outline">Apply</Button>
                      </div>
                      <Button onClick={() => navigate("/address")} className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-lg">
                        PLACE ORDER
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/products">Continue Shopping</Link>
                      </Button>
                    </div>

                    <div className="text-xs text-muted-foreground pt-4 space-y-1">
                      <p>* Free shipping on orders over ₹299</p>
                      <p>• 30 days return policy</p>
                      <p>• Secure payment</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="bg-pink-100 p-6 rounded-full">
              <ShoppingCart className="w-16 h-16 text-pink-600" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="mt-6 bg-pink-600 text-white py-6 px-8 hover:bg-pink-700"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
