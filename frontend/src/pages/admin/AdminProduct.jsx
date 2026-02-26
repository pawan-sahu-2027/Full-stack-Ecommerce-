// import { Input } from "@/components/ui/input";
// import { Edit, Search, Trash2 } from "lucide-react";
// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { DialogClose, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import ImageUpload from "@/components/imageUpload";
// import axios from "axios";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setProducts } from "redux/productSlice";
// function AdminProduct() {
//   const { products } = useSelector((state) => state.product);
//  const [editProduct , setEditProduct] = useState(null);
// const accessToken = localStorage.getItem('accessToken');
// const dispatch = useDispatch();
// const handleChange = (e)  => {
//      const {name , value} = e.target;
//      setEditProduct((prev) => ({ ...prev, [name]: value }));
//  }

//  const handleSave = async(e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('productName', editProduct.productName);
//     formData.append('productDesc', editProduct.productDesc);
//     formData.append('productPrice', editProduct.productPrice);
//     formData.append('brand', editProduct.brand);
//     formData.append('category', editProduct.category);

//     // add new images if uploaded
//     const existingImages = editProduct.productImg.filter((img) => !(img instanceof File) && img.public_id)
//     .map((img) => img.public_id);

//     formData.append('existingImages', JSON.stringify(existingImages));
//   // Add new files

//   editProduct.productImg
//   .filter((img) => img instanceof File)
//   .forEach((file) => formData.append('files', file));{
//      try {
//           const res = await axios.put(`http://localhost:8000/api/v1/product/update/${editProduct._id}`, formData, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           })

//           if (res.data.success) {
//             toast.success(res.data.message);
//             const usdateProducts = products.map((p) => {
//                 p._id === editProduct._id ? res.data.product : p
//              })

//             dispatch(setProducts(updateProducts))
//           }
//      }
//      catch(error){
//         toast.error('Failed to update product. Please try again.')
//         console.error('Error updating product:', error);
//      }
//   }
//   return (
//     <div className="p-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-200 ">
//       <div className=" flex justify-between">
//         <div className="relative bg-white rounded-lg">
//           <Input
//             type="text"
//             placeholder="Search Product..."
//             className="w-[400px] items-center"
//           />
//           <Search className="absolute right-3 top-1.5 text-gray-500 " />
//         </div>
//         <Select>
//           <SelectTrigger className="w-[200px] bg-white">
//             <SelectValue placeholder="Sort by Price" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
//               <SelectItem value="highToLow">Price: High to Low</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>
//       {products.map((product, index) => {
//         return (
//           <Card className="px-4" key={index}>
//             <div className="flex items-center justify-between ">
//               <div className="flex gap-2 items-center">
//                 <img
//                   src={product.productImg[0].url}
//                   alt={product.productName}
//                   className="w-25 h-25 "
//                 />
//                 <h1 className="font-bold w-96 text-gray-700">
//                   {product.productName}
//                 </h1>
//               </div>
//               <h1 className="font-semibold text-gray-800 ">
//                 ₹{product.productPrice}
//               </h1>
//               <div className="flex gap-3">
//                 <Dialog>

//                     <DialogTrigger asChild>
//                       <Edit onClick={() => {setEditProduct}} className="text-green-500 cursor-pointer" />
//                     </DialogTrigger>

//                     <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
//                       <DialogHeader>
//                         <DialogTitle>Edit Product</DialogTitle>
//                         <DialogDescription>
//                           Make changes to your product here. Click save when
//                           you're done.
//                         </DialogDescription>
//                       </DialogHeader>

//                       <div className="flex flex-col gap-2">
//                         <div className="grid gap-2">
//                           <Label>Product Name</Label>
//                           <Input
//                             type="text"
//                             name="productName"
//                             value={editProduct?.productName }
//                             onChange={handleChange}
//                             placeholder="Ex-Iphone"
//                             required
//                           />
//                         </div>

//                         <div className="grid gap-2">
//                           <Label>Price</Label>
//                           <Input type="number" name="productPrice"
//                            value={editProduct?.productPrice}
//                             onChange={handleChange}
//                              required />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="grid gap-2">
//                             <Label>Brand</Label>
//                             <Input
//                             type="text"
//                             name="brand"
//                             value={editProduct?.brand}
//                             onChange={handleChange}
//                             placeholder="Ex-Apple" required />
//                           </div>

//                              <div className="grid gap-2">
//                             <Label>Category</Label>
//                             <Input type="text" name="category"
//                             value={editProduct?.category}
//                             onChange={handleChange}
//                             placeholder="Ex-Smartphone" required />
//                           </div>

//                         </div>
//                         <div className="grid gap-2">
//                           <div className="flex items-center">
//                             <Label>Description</Label>
//                           </div>
//                           <Textarea name='productDesc'
//                            value={editProduct?.productDesc}
//                            onChange={handleChange}
//                            placeholder="Enter brief description of product"/>

//                         </div>
//                         <ImageUpload productData={editProduct} setProductsData={setEditProduct} />
//                       </div>

//                       <DialogFooter>
//                         <DialogClose asChild>
//                           <Button variant="outline" onClick={handleSave}>Cancel</Button>
//                         </DialogClose>

//                         <Button type="submit">Save changes</Button>
//                       </DialogFooter>
//                     </DialogContent>

//                 </Dialog>

//                 {/* <Edit className="text-green-500 cursor-pointer"/> */}
//                 <Trash2 className="text-red-500 cursor-pointer" />
//               </div>
//             </div>
//           </Card>
//         );
//       })}
//     </div>
//   );
// }
// export default AdminProduct
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Edit, Search, Trash2 } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useDispatch, useSelector } from "react-redux";
// import { Card } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogClose,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import ImageUpload from "@/components/imageUpload";
// import axios from "axios";
// import { toast } from "sonner";
// import { setProducts } from "@/redux/productSlice";

// function AdminProduct() {
//   const { products } = useSelector((state) => state.product);
//   const [editProduct, setEditProduct] = useState(null);
//   const dispatch = useDispatch();
//   const accessToken = localStorage.getItem("accessToken");

//   /* =========================
//      HANDLE INPUT CHANGE
//   ========================== */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   /* =========================
//      HANDLE SAVE
//   ========================== */
//   const handleSave = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("productName", editProduct.productName);
//       formData.append("productDesc", editProduct.productDesc);
//       formData.append("productPrice", editProduct.productPrice);
//       formData.append("brand", editProduct.brand);
//       formData.append("category", editProduct.category);

//       // Existing images
//       const existingImages = editProduct.productImg
//         .filter((img) => !(img instanceof File) && img.public_id)
//         .map((img) => img.public_id);

//       formData.append("existingImages", JSON.stringify(existingImages));

//       // New images
//       editProduct.productImg
//         .filter((img) => img instanceof File)
//         .forEach((file) => formData.append("files", file));

//       const res = await axios.put(
//         `http://localhost:8000/api/v1/product/update/${editProduct._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (res.data.success) {
//         toast.success(res.data.message);

//         const updatedProducts = products.map((p) =>
//           p._id === editProduct._id ? res.data.product : p
//         );

//         dispatch(setProducts(updatedProducts));
//         setEditProduct(null);
//       }
//     } catch (error) {
//       toast.error("Failed to update product");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-200">
//       {/* SEARCH & SORT */}
//       <div className="flex justify-between">
//         <div className="relative bg-white rounded-lg">
//           <Input
//             type="text"
//             placeholder="Search Product..."
//             className="w-[400px]"
//           />
//           <Search className="absolute right-3 top-1.5 text-gray-500" />
//         </div>

//         <Select>
//           <SelectTrigger className="w-[200px] bg-white">
//             <SelectValue placeholder="Sort by Price" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
//               <SelectItem value="highToLow">Price: High to Low</SelectItem>
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* PRODUCT LIST */}
//       {products.map((product) => (
//         <Card key={product._id} className="px-4">
//           <div className="flex items-center justify-between">
//             <div className="flex gap-2 items-center">
//               <img
//                 src={product.productImg?.[0]?.url}
//                 alt={product.productName}
//                 className="w-24 h-24 object-cover"
//               />
//               <h1 className="font-bold w-96 text-gray-700">
//                 {product.productName}
//               </h1>
//             </div>

//             <h1 className="font-semibold text-gray-800">
//               ₹{product.productPrice}
//             </h1>

//             <div className="flex gap-3">
//               {/* EDIT DIALOG */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Edit
//                     className="text-green-500 cursor-pointer"
//                     onClick={() => setEditProduct(product)}
//                   />
//                 </DialogTrigger>

//                 <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
//                   <DialogHeader>
//                     <DialogTitle>Edit Product</DialogTitle>
//                     <DialogDescription>
//                       Make changes and save
//                     </DialogDescription>
//                   </DialogHeader>

//                   <form onSubmit={handleSave} className="flex flex-col gap-3">
//                     <div className="grid gap-2">
//                       <Label>Product Name</Label>
//                       <Input
//                         name="productName"
//                         value={editProduct?.productName || ""}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="grid gap-2">
//                       <Label>Price</Label>
//                       <Input
//                         type="number"
//                         name="productPrice"
//                         value={editProduct?.productPrice || ""}
//                         onChange={handleChange}
//                         required
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="grid gap-2">
//                         <Label>Brand</Label>
//                         <Input
//                           name="brand"
//                           value={editProduct?.brand || ""}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="grid gap-2">
//                         <Label>Category</Label>
//                         <Input
//                           name="category"
//                           value={editProduct?.category || ""}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid gap-2">
//                       <Label>Description</Label>
//                       <Textarea
//                         name="productDesc"
//                         value={editProduct?.productDesc || ""}
//                         onChange={handleChange}
//                       />
//                     </div>

//                     <ImageUpload
//                       productData={editProduct}
//                       setProductData={setEditProduct}
//                     />

//                     <DialogFooter>
//                       <DialogClose asChild>
//                         <Button type="button" variant="outline">
//                           Cancel
//                         </Button>
//                       </DialogClose>
//                       <Button type="submit">Save changes</Button>
//                     </DialogFooter>
//                   </form>
//                 </DialogContent>
//               </Dialog>

//               {/* DELETE */}
//               <Trash2 className="text-red-500 cursor-pointer" />
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default AdminProduct;
import React from "react";
import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/imageUpload";
import { setProducts } from "@/redux/productSlice";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  let filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  }
  if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("brand", editProduct.brand);
    formData.append("category", editProduct.category);

    // Add Existing images

    const existingImages = editProduct.productImg
      .filter((img) => !(img instanceof File) && img.public_id)
      .map((img) => img.public_id);

    formData.append("existingImages", JSON.stringify(existingImages));

    // Add new files

    editProduct.productImg
      .filter((img) => img instanceof File)
      .forEach((file) => {
        formData.append("files", file);
      });
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/product/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        // setEditProduct(null);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const remainingProducts = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `http://localhost:8000/api/v1/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setProducts(remainingProducts));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pl-[350px] py-20 pr-20 flex flex-col gap-3 min-h-screen bg-gray-100">
      <div className="flex justify-between">
        <div className="relative bg-white rounded-lg">
          <Input
            type="text"
            name="productName"
            placeholder="Search Product..."
            className="w-[400px] items-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1.5 text-gray-500" />
        </div>

        <Select  value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Sort by Price" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
            <SelectItem value="highToLow">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filteredProducts.map((product, index) => {
        return (
          <Card key={index} className="px-4 ">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <img
                  src={product.productImg[0].url}
                  alt={product.name}
                  className="w-25 h-25"
                />
                <h1 className="font-bold w-96 text-gray-700 ">
                  {product.productName}
                </h1>
              </div>
              <h1 className="font-semibold text-gray-800">
                ₹{product.productPrice}
              </h1>
              <div className="flex gap-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Edit
                      onClick={() => {
                        setOpen(true);
                        setEditProduct(product);
                      }}
                      className="text-green-500 cursor-pointer"
                    ></Edit>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px] max-h-[740px] overflow-y-scroll">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Make changes to your product here. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSave}>
                      <div className="flex flex-col gap-2">
                        <div className="grid gap-2">
                          <Label>Product Name</Label>
                          <Input
                            value={editProduct?.productName}
                            onChange={handleChange}
                            type="text"
                            name="productName"
                            placeholder="Enter product name"
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Product Price</Label>
                          <Input
                            type="number"
                            value={editProduct?.productPrice}
                            onChange={handleChange}
                            name="productPrice"
                            placeholder="Enter product price"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label>Brand</Label>
                          <Input
                            type="text"
                            name="brand"
                            placeholder="Enter brand name"
                            value={editProduct?.brand}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Category</Label>
                          <Input
                            type="text"
                            name="category"
                            placeholder="Enter category name"
                            value={editProduct?.category}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-2 ">
                        <div className=" items-center">
                          <Label>Description</Label>
                          <Textarea
                            name="description"
                            placeholder="Enter product description"
                            value={editProduct?.productDesc}
                            onChange={handleChange}
                          />
                        </div>

                        <ImageUpload
                          productData={editProduct}
                          setProductData={setEditProduct}
                        />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* thigyhvhbhbhb */}

                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="outline" />}>
                    <Trash2 className="text-red-500 cursor-pointer"></Trash2>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteProduct(product._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
export default AdminProduct;

// import React, { useState } from 'react';
