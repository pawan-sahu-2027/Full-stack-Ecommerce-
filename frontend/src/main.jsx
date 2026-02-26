

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";

// import { Provider } from "react-redux";
// import { store } from "./redux/store.js"; 
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "./lib/stripe"; 

// // persistor.purge();

// let persistor = persistStore(store);
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//        {/* <Elements stripe={stripePromise}> */}
//          <App />
//        {/* </Elements> */}
        
//       </PersistGate>
//     </Provider>
//   </StrictMode>
// );
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.js"; 
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize stripePromise here if not in a separate lib file
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

let persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* Wrap App here so useStripe works everywhere inside App */}
        {/* <Elements stripe={stripePromise}> */}
          <App />
        {/* </Elements> */}
      </PersistGate>
    </Provider>
  </StrictMode>
);