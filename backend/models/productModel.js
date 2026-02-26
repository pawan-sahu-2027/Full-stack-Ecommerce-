import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Fixed typo "trype"
      ref: 'User',
    //   required: true, // Recommended since products usually belong to a user
    },
    productName: {
      type: String,
      required: true,
    },
    productDesc: {
      type: String,
      required: true,
    },
    productImg: [
      {
      url: {
        type: String,
        required: true,
      },
      public_id: { // Usually called public_id for Cloudinary consistency
        type: String,
        required: true,
      },
    }
    ], // Fixed: Removed the incorrect ']' bracket here
    productPrice: {
      type: Number,
    //   required: true, // Usually prices should be required
    },
    category: { // Fixed typo "catagory"
      type: String,
    //   required: true,
    },
    brand: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

 const Product = mongoose.model("Product", productSchema);

    export default Product;