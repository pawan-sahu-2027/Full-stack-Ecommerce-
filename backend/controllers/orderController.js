import { Order } from "../models/orderModel.js";
import Stripe from "stripe";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createOrder = async (req, res) => {
  try {
    const { products, amount, tax, shipping } = req.body;

    // 1. Create Checkout Session
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Store Order Payment" },
            unit_amount: Math.round(amount * 100), // paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // These return the user back to your site
      success_url: "http://localhost:5173/order-success",
      cancel_url: "http://localhost:5173/checkout?payment_failed=true",
    });

    // 2. Save Order to DB (Ensuring tax and shipping are passed)
    const newOrder = new Order({
      user: req.id,
      products,
      amount,
      tax: Number(tax),
      shipping: Number(shipping),
      status: "pending",
      paymentIntentId: session.id,
    });

    await newOrder.save();

    // 3. SEND THE URL BACK TO FRONTEND
    res.status(200).json({
      success: true,
      url: session.url, // This is the direct Stripe checkout link
    });
  } catch (error) {
    console.error("Stripe Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const stripeWebhookController = async (req, res) => {
  console.log("🚀 Webhook Received! Checking signature...");
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body, // This MUST be the raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("❌ Webhook Signature Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Update order status using the sessionId (stored in paymentIntentId)
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentIntentId: session.id },
      { status: "Paid" },
      { new: true },
    );

    if (updatedOrder) {
      console.log("Order updated to Paid:", updatedOrder?._id);
    } else {
      console.log("Order not found for session ID:", session.id);
    }
    res.json({ received: true });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.id; // Assuming req.id is set by auth middleware
    const orders = await Order.find({ user: req.id })
      .populate({
        path: "products.productId",
        select: "productName price productImg",
      })
      .populate("user", "firstName lastName email");

    res.status(200).json({
      success: true,
      orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin route to get all orders
export const getUser = async (req  , res) => {
    try {
         const {userId} = req.params; // Assuming req.id is set by auth middleware
         const orders = await Order.find({user: userId})
         .populate({
          path: "products.productId",
          select: "productName productPrice productImg",
        })
          .populate("user", "firstName lastName email");
         res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });
    }
    catch (error) {
      console.error("Error fetching user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
  }

  export const getAllOrdersAdmin = async (req,res) =>{
      try {
         const orders = await Order.find()
         .sort({ createdAt: -1 })
         .populate("user", "firstName lastName email")
         .populate("products.productId", "productName productPrice productImg");
         res.status(200).json({
          success: true,
          count: orders.length,
          orders,
        });

      }
      catch(error){
        console.error("Error fetching all orders for admin:", error);
        res.status(500).json({ success: false, message: error.message });
      }
  }

export const getMyOrder = async (req , res) =>{
  try {
    const userId = req.id; // Assuming req.id is set by auth middleware
    const orders = await Order.find({ user: userId })
      .populate({
        path: "products.productId",
        select: "productName price productImg",
      })
      .populate("user", "firstName lastName email");
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export const getSalesData = async (req, res) => {

  try {
      const totalUser = await User.countDocuments();
      const totalProducts  = await Product.countDocuments();
      const totalOrders = await Order.countDocuments({status:"Paid"});
      // total selle amount 
      const totalSaleAgg = await Order.aggregate([
          {$match: {status: "Paid"}},
          {$group: {_id: null, total: {$sum: "$amount"}}}
      ])
      const totalSale = totalSaleAgg[0]?.total || 0;

      // sales gruped by day for last 30 days
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              const salesByDay = await Order.aggregate([
                {
                  $match: {
                    status: "Paid",
                    createdAt: { $gte: thirtyDaysAgo },
                  },
                },
                {
                  $group: {
                    _id: {
                      $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    totalAmount: { $sum: "$amount" },

                  },
                },
                { $sort: { _id: 1 } },
              ]);

              const formatedSales = salesByDay.map((item) => ({
                 date: item._id,
                  amount: item.totalAmount,
              }))
              res.status(200).json({
                success: true,
                totalUsers: totalUser,
                totalProducts,
                totalOrders,
                totalSales: totalSale,
                salesByDate: formatedSales,
              });
            }
  
  catch(error){
    console.error("Error fetching sales data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}