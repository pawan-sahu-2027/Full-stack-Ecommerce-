// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { addAddress, deleteAddress } from "@/redux/productSlice";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// // import axios from "axios";
// const AddressForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     zipCode: "",
//     country: "",
//   });
//   const { cart, addresses, selectedAddress } = useSelector(
//     (state) => state.product,
//   );
//   const [showForm, setShowForm] = useState(
//     addresses?.length > 0 ? false : true,
//   );
//   const dispatch = useDispatch();
//   const Navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

 
//   return (
//     <div className="max-w-7xl mx-auto grid place-items-center p-10">
//       <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
//         <div className="space-y-4 bg-white">
//           {showForm ? (
//             <>
//               <div>
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   required
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                 ></Input>
//               </div>

//               <div>
//                 <Label htmlFor="phone">Phone</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   required
//                   placeholder="123-456-7890"
//                   value={formData.phone}
//                   onChange={handleChange}
//                 ></Input>
//               </div>

//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   required
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                 ></Input>

//                 <div>
//                   <Label htmlFor="address">Address</Label>
//                   <Input
//                     id="address"
//                     name="address"
//                     required
//                     placeholder="123 Main Street"
//                     value={formData.address}
//                     onChange={handleChange}
//                   ></Input>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <Label htmlFor="city">City</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       placeholder="New York"
//                       value={formData.city}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="state">State</Label>
//                     <Input
//                       id="state"
//                       name="state"
//                       placeholder="Bhopal"
//                       value={formData.state}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                   <div>
//                     <Label htmlFor="zipCode">Zip Code</Label>
//                     <Input
//                       id="zipCode"
//                       name="zipCode"
//                       placeholder="12345"
//                       value={formData.zipCode}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div>
//                     <Label htmlFor="country">Country</Label>
//                     <Input
//                       id="country"
//                       name="country"
//                       placeholder="India"
//                       value={formData.country}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <Button onClick={handleSave} className="w-full ">
//                 Save and Continue
//               </Button>
//             </>
//           ) : (
//             <div className="space-y-4">
//               <h2 className="text-lg font-semibold">Saved addresses</h2>

//               {addresses.map((addr, index) => (
//                 <div
//                   key={index}
//                   onClick={() => dispatch(selectedAddress(index))}
//                   className={`p-4 border rounded-md cursor-pointer relative ${
//                     selectedAddress === index
//                       ? "border-pink-600 bg-pink-50"
//                       : "border-gray-300"
//                   }`}
//                 >
//                   <p className="font-medium">{addr.fullName}</p>
//                   <p>{addr.email}</p>
//                   <p>
//                     {addr.address}, {addr.city}, {addr.state} {addr.zipCode}
//                   </p>

//                   <button
//                     onClick={(e) => {
//                       dispatch(deleteAddress(index));
//                     }}
//                     className="absolute top-2 right-2
//                      text-red-500 hover:text-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}

//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => setShowForm(true)}
//               >
//                 + Add New Address
//               </Button>

//               {/* Stripe Card UI */}
//               <div className="mt-6 border p-4 rounded-md">
//                 <PaymentElement />
//               </div>

//               <Button
//                 // disabled={selectedAddress === null}
//                 disabled={!stripe || !elements || selectedAddress === null}
//                 className="w-full bg-pink-600"
               
//               >
//                 Proceed to checkout
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Right side order summary section */}
//         <div>
//           <div className="w-[400px] border ">
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between ">
//                 <span> subtotal</span>
//                 <span>₹{subTotal}</span>
//               </div>
//               <div className="flex justify-between ">
//                 <span>Shipping</span>
//                 <span>₹{shipping}</span>
//               </div>
//               <div className="flex justify-between ">
//                 <span>Tax</span>
//                 <span>₹{tax}</span>
//               </div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>₹{total}</span>
//               </div>

//               <div className="text-sm text-muted-foreground pt-4">
//                 <p>* Free shipping on orders over ₹299</p>
//                 <p>• 30 days return policy</p>
//                 <p>• Secure payment</p>
//               </div>
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddressForm;



// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addAddress, deleteAddress } from "@/redux/productSlice";
// import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const AddressForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "", phone: "", address: "", city: "", zipCode: "", country: "",
//   });
  
//   const [clientSecret, setClientSecret] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);

//   const { cart, addresses, selectedAddress } = useSelector((state) => state.product);
//   const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // const stripe = useStripe();
  

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     dispatch(addAddress(formData));
//     setShowForm(false);
//   };

//   // Calculations
//   const subTotal = cart?.totalPrice || 0;
//   const shipping = subTotal > 299 || subTotal === 0 ? 0 : 200;
//   const tax = parseFloat((subTotal * 0.05).toFixed(2));
//   const total = subTotal + shipping + tax;
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// const handlePayment = async () => {
//     if (selectedAddress === null) return toast.error("Select an address");
    
//     setIsProcessing(true);
//     const stripe = await stripePromise; // Get the stripe object manually

//     try {
//       // 1. Call your backend to create the order and get the clientSecret
//       const { data } = await axios.post(
//         "http://localhost:8000/api/v1/orders/create-order",
//         {
//           products: cart.items.map(item => ({ 
//             productId: item.productId._id, 
//             quantity: item.quantity 
//           })),
//           amount: total,
//           tax,
//           shipping,
//           currency: "INR"
//         },
//         { withCredentials: true }
//       );

//       if (!data.success) throw new Error("Backend failed to create order");

//       // 2. Redirect to Stripe's Hosted Checkout Page
//       // This is the easiest "Element-Free" way. 
//       // Stripe handles the card UI on their own secure site.
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: {
//             // If you use 'card' here, you need a card element.
//             // SINCE YOU WANT ELEMENT FREE: Use 'confirmPayment' redirect flow
//           },
//         },
//       });

//       // ALTERNATIVE: Use Stripe Checkout (Recommended for "Element-Free")
//       // If you want to keep the UI on your page but avoid the "Context" error,
//       // the only way is to use the code below which redirects to Stripe's UI.
      
//       const { error } = await stripe.redirectToCheckout({
//         sessionId: data.sessionId, // You would need to update your backend to return a Session ID
//       });

//       if (error) toast.error(error.message);

//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setIsProcessing(false);
//     }
//   };
//   return (
//     <div className="max-w-7xl mx-auto grid place-items-center p-10">
//       <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
//         <div className="space-y-4 bg-white">
//           {showForm ? (
//             <>
//               {/* Form Inputs (Same as your original code) */}
//               <div><Label>Full Name</Label><Input name="fullName" value={formData.fullName} onChange={handleChange} /></div>
//               <div><Label>Phone</Label><Input name="phone" value={formData.phone} onChange={handleChange} /></div>
//               {/* ... other inputs ... */}
//               <Button onClick={handleSave} className="w-full">Save and Continue</Button>
//             </>
//           ) : (
//             <div className="space-y-4">
//               <h2 className="text-lg font-semibold">Saved addresses</h2>
//               {addresses.map((addr, index) => (
//                 <div key={index} onClick={() => dispatch({type:'product/selectedAddress', payload: index})} className={`p-4 border rounded-md cursor-pointer ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}>
//                   <p className="font-medium">{addr.fullName}</p>
//                   <p>{addr.address}, {addr.city}</p>
//                 </div>
//               ))}
//               <Button variant="outline" className="w-full" onClick={() => setShowForm(true)}>+ Add New Address</Button>
              
//               <div className="mt-6 border p-4 rounded-md">
//                 <PaymentElement />
//               </div>

//               <Button 
//                 disabled={!stripe || isProcessing || selectedAddress === null} 
//                 className="w-full bg-pink-600" 
//                 onClick={handlePayment}
//               >
//                 {isProcessing ? "Processing..." : "Pay Now"}
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Right side Summary (Same as your original code) */}
//         <div>
//           <div className="w-[400px] border">
//             <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between"><span>subtotal</span><span>₹{subTotal}</span></div>
//               <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
//               <div className="flex justify-between"><span>Tax</span><span>₹{tax}</span></div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{total}</span></div>
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default AddressForm;



import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAddress, deleteAddress } from "@/redux/productSlice";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe outside the component
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "", phone: "", address: "", city: "", zipCode: "", country: "",
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, addresses, selectedAddress } = useSelector((state) => state.product);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  // Calculations
  const subTotal = cart?.totalPrice || 0;
  const shipping = subTotal > 299 || subTotal === 0 ? 0 : 200;
  const tax = parseFloat((subTotal * 0.05).toFixed(2));
  const total = subTotal + shipping + tax;

  // const handlePayment = async () => {
  //   if (selectedAddress === null) return toast.error("Select an address");
  // setIsProcessing(true);
  //   // if (selectedAddress === null) return toast.error("Please select a shipping address");
    
  //   // setIsProcessing(true);

  //   try {
  //     const stripe = await stripePromise; // Manually get stripe instance
      
  //     // 1. Create Order & Get Client Secret
  //     const { data } = await axios.post(
  //       "http://localhost:8000/api/v1/orders/create-order",
  //       {
  //         products: cart.items.map(item => ({ 
  //           productId: item.productId._id, 
  //           quantity: item.quantity 
  //         })),
  //         amount: total,
  //         tax,
  //         shipping,
  //         currency: "INR"
  //       },
  //       { withCredentials: true }
  //     );

  //     if (!data.success) throw new Error("Order creation failed");

  //     // 2. ELEMENT-FREE REDIRECT
  //     // This will take the user to a secure Stripe-hosted page to enter card details
  //     // You must update your backend controller to return a 'sessionId'
  //     if (data.sessionId) {
  //       const { error } = await stripe.redirectToCheckout({
  //         sessionId: data.sessionId,
  //       });
  //       if (error) toast.error(error.message);
  //     } else {
  //       // If you are still using PaymentIntents, you can't be "Element-free" 
  //       // unless you use the redirect method above.
  //       toast.error("Backend must provide a Session ID for Element-free checkout");
  //     }

  //   } catch (error) {
  //     toast.error(error.message || "Something went wrong");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };
const handlePayment = async () => {
  if (selectedAddress === null) return toast.error("Select an address");
  console.log("Payment process started...");
  setIsProcessing(true);

  try {
    const stripe = await stripePromise;
    // Get token (adjust this based on where you store it: localStorage or Redux)
    // const token = localStorage.getItem("token"); 
    const accessToken = localStorage.getItem("accessToken");
console.log("Token found:", accessToken);
    const { data } = await axios.post(
      "http://localhost:8000/api/v1/orders/create-order",
      {
        products: cart.items.map(item => ({ 
          productId: item.productId._id, 
          quantity: item.quantity 
        })),
        amount: total,
        tax,
        shipping,
        currency: "INR"
      },
      { 
        headers: { Authorization: `Bearer ${accessToken}` }, // Add this!
        withCredentials: true 
      }
    );
    console.log("Backend Response:", data);

    if (data.success && data.url) {
      console.log("Redirecting to:", data.url);
      // await stripe.redirectToCheckout({ sessionId: data.sessionId });
      window.location.href = data.url; // Use this for simple redirect without Stripe Elements
    }
    else {
      setIsProcessing(false);
      toast.error("Failed to create order. Please try again.");
    }
  } catch (error) {
    console.error("Frontend Error:", error);
    toast.error(error.response?.data?.message || error.message);
  } finally {
    setIsProcessing(true); // Keep it true to prevent double clicking during redirect
  }
};
  return (
    <div className="max-w-7xl mx-auto grid place-items-center p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-20 mt-10">
        <div className="space-y-4 bg-white p-6 rounded-lg border">
          {showForm ? (
            <div className="space-y-4">
              <CardTitle className="mb-4">Add Shipping Address</CardTitle>
              <div><Label>Full Name</Label><Input name="fullName" value={formData.fullName} onChange={handleChange} /></div>
              <div><Label>Phone</Label><Input name="phone" value={formData.phone} onChange={handleChange} /></div>
              <div><Label>Address</Label><Input name="address" value={formData.address} onChange={handleChange} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>City</Label><Input name="city" value={formData.city} onChange={handleChange} /></div>
                <div><Label>Zip Code</Label><Input name="zipCode" value={formData.zipCode} onChange={handleChange} /></div>
              </div>
              <Button onClick={handleSave} className="w-full">Save Address</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Shipping Address</h2>
              {addresses.map((addr, index) => (
                <div 
                  key={index} 
                  onClick={() => dispatch({type:'product/selectedAddress', payload: index})} 
                  className={`p-4 border rounded-md cursor-pointer transition-all ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="text-sm text-gray-600">{addr.address}, {addr.city}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => setShowForm(true)}>+ Add New Address</Button>
              
              {/* NO STRIPE ELEMENTS HERE - CLEAN UI */}
              <div className="pt-6">
                <Button 
                  disabled={isProcessing || selectedAddress === null} 
                  className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-lg" 
                  onClick={handlePayment}
                >
                  {isProcessing ? "Redirecting to Secure Payment..." : `Pay ₹${total}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right side Summary */}
        <div className="sticky top-10">
          <div className="w-full md:w-[400px] border rounded-lg bg-white">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subTotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
              <div className="flex justify-between"><span>Tax (5%)</span><span>₹{tax}</span></div>
              <Separator />
              <div className="flex justify-between font-bold text-xl text-pink-600"><span>Total</span><span>₹{total}</span></div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;