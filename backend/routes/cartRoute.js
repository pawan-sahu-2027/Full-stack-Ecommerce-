import express from "express";
import { addToCart, getCart, updateQuantity ,removeFromCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"; 
const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add",isAuthenticated, addToCart);
router.put("/update",isAuthenticated, updateQuantity);
// router.put("/update", (req, res, next) => {
//   console.log("UPDATE ROUTE HIT");
//   next();
// }, isAuthenticated, updateQuantity);

router.delete("/remove" , isAuthenticated ,  removeFromCart);

export default router;