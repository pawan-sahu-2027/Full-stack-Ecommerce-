import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddressForm from "./AddressForm"; 

// Initialize Stripe outside the component to avoid recreating it on every render
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Secure Checkout</h1>
        
        {/* If we have a clientSecret, wrap AddressForm in Elements */}
        {clientSecret ? (
          <Elements stripe={stripePromise} options={options}>
            <AddressForm clientSecret={clientSecret} />
          </Elements>
        ) : (
          /* If no secret yet, render AddressForm normally to fetch it */
          <AddressForm setClientSecret={setClientSecret} />
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;