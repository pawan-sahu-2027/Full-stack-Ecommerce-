import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async(req, res, next) => {
 
  // console.log("Auth middleware HIT");
  // console.log("Headers:", req.headers.authorization);
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Unauthorized Authoriz token is missing or invalid",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          message: "Invalid or expired token",
          success: false,
        });
      }
      return res.status(400).json({
        message: "Access token is misssing or invalid",
        success: false,
      });
    }

       const user = await User.findById(decoded.id);
         if (!user){
            return res.status(400).json({
                message: "User not found",
                success: false,
            })
         }
          req.user = user;
         req.id = user._id;
         next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
  

};


export const isAdmin = (req , res , next) => {
       if (req.user && req.user.role === 'admin') {
            next();
       }
       else {
        return res.status(403).json({
          message: "Access denied Admin only",
          success: false,
        })
       }
}