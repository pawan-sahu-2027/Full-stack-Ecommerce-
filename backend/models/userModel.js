// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//   },
//   profilePic: {
//     type: String,
//     default: "",
//   }, // Cloudinary URL
//   profilePicPublicId: {
//     type: String,
//     default: "",
//   }, // cloudinary pulic id

//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
//   token: {
//     type: String,
//     default: null,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//     otp: {
//     type: String,
//     default: null,
//   },

//   otpExpiry: {
//     type: Date,
//     default: null,
//   },
//   // token: {
//   //   type: String,
//   //   default: null,
//   // },
//   isLoggedIn: {
//     type: Boolean,
//     default: false,
//   },
// });


// const User = mongoose.model("User", userSchema);
// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  // 🔽 ADD THESE
  phoneNo: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  zipCode: {
    type: String,
    default: "",
  },

  profilePic: {
    type: String,
    default: "",
  },
  profilePicPublicId: {
    type: String,
    default: "",
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Date,
    default: null,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;