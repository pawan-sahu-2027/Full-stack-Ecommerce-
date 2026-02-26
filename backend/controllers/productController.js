import cloudinary from "../utils/cloudinary.js";
import Product from "../models/productModel.js";
import getDataUri from "../utils/dataUri.js";
export const addProduct = async (req, res) => {
  try {
    const { productName, productDesc, productPrice, category, brand } =
      req.body;
    const userId = req.id;

    if (!productName || !productDesc || !productPrice || !category || !brand) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    let productImg = [];
    if (req.files && req.files.length > 0) {
      for (let files of req.files) {
        const fileUrl = await getDataUri(files);
        const result = await cloudinary.uploader.upload(fileUrl, {
          folder: "mern_products",
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // create a new product in DB

    const newProduct = await Product.create({
      userId,
      productName,
      productDesc,
      productImg,
      productPrice,
      category,
      brand,
      productImg, // array of objects {{url , public_id , {url , public_id}}
    });
    return res.status(201).json({
      message: "Product added successfully",
      success: true,
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found",
        success: false,
        products: [],
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      success: true,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    // delete images from cloudinary

    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // Delete product from mongoDb
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const upDateProduct = async (req , res) =>{
      try {
        const { productId } = req.params;
        const { productName, productDesc, productPrice, category, brand , existingImages } = req.body;

        const product = await Product.findById(productId);
         if (!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
         }
         let updatedImage = []
          // keep selected old images =
          if (existingImages){
            const keepIds = JSON.parse(existingImages);
            updatedImage = product.productImg.filter(
                img => keepIds.includes(img.public_id));
           

          // delete only remove images 
          const removedImages = product.productImg.filter(
            (img) => !keepIds.includes(img.public_id)   
          )
           for (const img of removedImages){
             await cloudinary.uploader.destroy(img.public_id);
           }
        }
        else {
             updatedImage = product.productImg;// keep all ifnothing sent
        }

        // upload new images if any 

        if (req.files && req.files.length > 0){
            for (let file of req.files){
                 const fileUri = getDataUri(file);
                 const result = await cloudinary.uploader.upload(fileUri,{
                    folder:"mern_products"
                 });
                 updatedImage.push({    
                    url: result.secure_url,
                    public_id: result.public_id
                 })
            }
      }
        // update product 

        product.productName = productName || product.productName;
        product.productDesc = productDesc || product.productDesc;
        product.productPrice = productPrice || product.productPrice;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.productImg = updatedImage;
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: product
        });
    }
      catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
      }
}


 
export const getMyOrder = async (req , res) =>{
}