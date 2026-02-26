// import express from "express";
// import { register, reVerify , verifyOTP ,  changePassword, upDateUser } from "../controllers/userController.js";
// import { verify } from "../controllers/userController.js";
// import { login } from "../controllers/userController.js";
// import { logout } from "../controllers/userController.js";
// import { forgotPassword } from "../controllers/userController.js";
// import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
// import { allUser} from "../controllers/userController.js";
// import { getUserById } from "../controllers/userController.js";
// import { singleUpload } from "../middleware/multer.js";

import express from "express";
import {
  register,
  verify,
  reVerify,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  changePassword,
  upDateUser,
  allUser,
  getUserById
} from "../controllers/userController.js";

import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();
router.post('/register', register);
router.post('/verify', verify);
router.post('/reverify', reVerify);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/change-password/:email', changePassword);
router.get('/all-user' , isAuthenticated, isAdmin, allUser);
router.get('/get-user/:userId', getUserById );

router.put('/update/:id', singleUpload, isAuthenticated, upDateUser);

export default router; 