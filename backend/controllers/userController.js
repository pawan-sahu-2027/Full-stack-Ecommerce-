// import User from '../models/userModel.js';
import User from "../models/userModel.js";
// import decreptPassword from "../utils/decreptPassword.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVarify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVarify/sendOTPMail.js";
// import { v2 as cloudinary } from 'cloudinary';
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // if (await User.findOne({ email })) {
    //   return res.status(400).json({
    //     message: "User already exists",
    //     success: false,
    //   });
    // }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      message: "User register successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Registration failed",
      success: false,
      error: error.message,
    });
  }
};


export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Verification token is missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];

   

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "Verification token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid verification token",
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // // prevent reuse
    // if (user.token !== token) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Token already used or invalid",
    //   });
    // }

    user.isVerified = true;
    user.token = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Email verification failed",
      error: error.message,
    });
  }
};

// export const verify = async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Unauthorized  token is missing or invalid",
//         success: false,
//       });
//     }
//     const token = authHeader.split(" ")[1];
    
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.SECRET_KEY);
//     } catch (error) {
//       if (error.name === "TokenExpiredError") {
//         return res.status(400).json({
//           message: "Invalid or expired token",
//           success: false,
//         });
//       }

//       return res.status(500).json({
//         message: "Token verification failed",
//         success: false,
//       });
//     }
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//      if (user.token !== token) {
//       return res.status(400).json({
//         success: false,
//         message: "Token does not match or already used",
//       });
//     }

//     user.isVerified = true;
//      user.token = null;
//     await user.save();
//     return res.status(200).json({
//       message: "Email verified successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Email verification failed",
//       success: false,
//       error: error.message,
//     });
//   }
// };
export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: " user not found",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      message: "Verification email sent successfully",
      success: true,
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Re verification failed",
      success: false,
      error: error.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: " All fiels are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid credientials",
        success: false,
      });
    }
    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email to login",
        success: false,
      });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10d",
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true;
    await user.save();
    // check for the existing session and delete it
    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) {
      await Session.deleteOne({ userId: user._id });
    }
    // Create a new session
    await Session.create({ userId: user._id });

    return res.status(200).json({
      message: `Login successfully ${user.firstName}`,
      success: true,
      user,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Login failed",
      success: false,
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const  userId  = req.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId required" });
    }

    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout failed" + error.message,
      success: false,
      error: error.message,
    });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPMail(otp, email);
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const otp = req.body.otp;
    const email = req.params.email;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.otp === null || user.otpExpiry === null) {
      return res.status(400).json({
        success: false,
        message: "Otp is not generated yet, please generate otp",
      });
    }
    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: " otp expired",
      });
    }
    if ( user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp ",
      });
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: " All fields are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match ",
      });
    }
    const user = await User.findOne({ email });
    if (user == null) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const allUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        message: "UserId is required",
        success: false,
      });
    }
      console.log("Fetching user with ID:", userId); // Debug log 1
    const user = await User.findById(userId).select(
      "-password",
      "-otp",
      "-otpExpiry",
      "-token",
    );
          console.log("Fetching user with ID:", userId); // Debug log 2 
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const upDateUser = async (req, res) => {
  console.log("Files received:", req.file);
  try {

    const userIdToUpdate = req.params.id;
     const loggedInuser = req.user;   // from isAuthenticated middleware
     const {firstName, lastName, address, city, zipCode , phoneNo , role} = req.body;
      if (loggedInuser._id.toString() != userIdToUpdate && loggedInuser.role !== 'admin'){
          return res.status(403).json({
            message: "Access denied. You are bnot allowed to upate this profile",
            success: false,
          });
      }
      let user = await User.findById(userIdToUpdate);
      if (!user){
        return res.status(404).json({
            message: "User not found",
            success: false,
        })
      }
      let profilePic = user.profilePic;
      let profilePicPublicId = user.profilePicPublicId;

      // if a new file is uploaded
      if (req.file){
        if (profilePicPublicId){
            // delete the existing image from cloudinary
            await cloudinary.uploader.destroy(profilePicPublicId);
        }
          const uploadResult = await new Promise((resolve, reject) => {
             const stream = cloudinary.uploader.upload_stream(
                { folder: 'profile_pics' },
                (error, result) => {
                  if (error){
                     reject(error);
                    } else {
                      resolve(result);
                     }
                    }
             );
                    stream.end(req.file.buffer);

          });
      profilePic = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
      }

      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      user.city = city || user.city;
      user.zipCode = zipCode || user.zipCode;
      user.phoneNo = phoneNo || user.phoneNo;
      user.role = role || user.role;
      user.profilePic = profilePic;
      user.profilePicPublicId = profilePicPublicId;
      const updatedUser = await user.save();
      return res.status(200).json({
        message: "User updated successfully",
        success: true,
        user: updatedUser,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
