// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './database/db.js';
// import userRoutes from './routes/userRoute.js';
// dotenv.config();


// // const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use('/api/v1/user', userRoutes);


// const server = app.listen(PORT,"0.0.0.0" , () => {
//     connectDB();
//     console.log('Server is running at port ' + PORT)
// })

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoute.js";
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { stripeWebhookController } from "./controllers/orderController.js";
dotenv.config();

const app = express();
const PORT = 8000;

app.post(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhookController
);


// middleware
app.use(express.json());
app.use(cors({
   origin:'http://localhost:5173',
   credentials:true
}))
// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/orders", orderRoute);


// health check
app.get("/health", (req, res) => {
  res.status(200).send("API is running");
});


// ✅ START SERVER FIRST (important)
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("Express server listening on port " + PORT);
});

// ✅ CONNECT DB AFTER SERVER IS UP
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDb connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";

// import userRoutes from "./routes/userRoute.js";
// import productRoutes from "./routes/productRoutes.js";
// import cartRoute from "./routes/cartRoute.js";
// import orderRoute from "./routes/orderRoute.js";
// import { stripeWebhookController } from "./controllers/orderController.js";

// dotenv.config();

// const app = express();
// const PORT = 8000;

// /* =========================
//    ✅ JSON PARSER (EXCEPT STRIPE)
// ========================= */
// app.use((req, res, next) => {
//   if (req.originalUrl === "/api/v1/stripe/webhook") {
//     next(); // ⛔ skip JSON parser
//   } else {
//     express.json()(req, res, next);
//   }
// });

// /* =========================
//    ✅ STRIPE WEBHOOK (RAW)
// ========================= */
// app.post(
//   "/api/v1/stripe/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhookController
// );

// /* =========================
//    NORMAL MIDDLEWARE
// ========================= */
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// /* =========================
//    ROUTES
// ========================= */
// app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/cart", cartRoute);
// app.use("/api/v1/orders", orderRoute);

// /* =========================
//    HEALTH CHECK
// ========================= */
// app.get("/health", (req, res) => {
//   res.status(200).send("API is running");
// });

// /* =========================
//    START SERVER + DB
// ========================= */
// app.listen(PORT, "0.0.0.0", async () => {
//   console.log("Express server listening on port " + PORT);

//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection failed:", err.message);
//   }
// });