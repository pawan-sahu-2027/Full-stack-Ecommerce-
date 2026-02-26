import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
// import { Input } from '@/components/ui/input.tsx'
import { Input } from "@/components/ui/input"
import ImageUpload from '@/components/imageUpload'
import React from 'react'
import { CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner' 
import axios from 'axios'
import { useDispatch } from "react-redux"
import { setProducts } from "@/redux/productSlice"
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from "react-redux";
function AddProduct() {
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [productData, setProductData] = useState({
    productName: '',
    productPrice: 0,
    brand: '',
    category: '',
    productDesc: '',
    productImage: [],
  })
  const { products } = useSelector((state) => state.product);
  const handleChange = (e) => {
    const {name , value} = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  }
 
  const submitHandler = async(e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append('productName', productData.productName);
     formData.append('productPrice', productData.productPrice);
     formData.append('brand', productData.brand);
     formData.append('category', productData.category);
     formData.append('productDesc', productData.productDesc);
     if (productData.productImage.length === 0) {
         toast.error('Please upload at least one product image');
         return;
     }
      productData.productImage.forEach((img) => {
        formData.append('files', img);
    })  
    try{
      setLoading(true)
      const res = await axios.post('http://localhost:8000/api/v1/product/add', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
    }
      })
      if (res.data.success){
        // dispatch(setProductData([...productData.products, res.data.product]))
         dispatch(setProducts([...products, res.data.product]));
        toast.success(res.data.message)
      }
  }
  catch(error){
    console.error(error.response?.data?.message || error.message)
    toast.error(error.response?.data?.message || 'Something went wrong')
  }
  finally{
    setLoading(false)
  }
  }

  return (
    <div className='pl-[350px] py-20 pr-20 mx-auto px-4 bg-gray-100 '>
      <Card>
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>Enter product details below</CardDescription>
        </CardHeader>
        <CardContent>
           <div className='flex flex-col gap-2'>
            <div className='grid gap-2'>
              <Label>Product Name</Label>
              <Input  type='text'
               name='productName'
               value={productData.productName}
                onChange={handleChange}
                 placeholder='Enter product name' 
                 required /> 

            </div>

              <div className='grid gap-2'>
              <Label>Price Name</Label>
              <Input type='text'
               name='productPrice'
               value={productData.productPrice}
                onChange={handleChange}
                 placeholder='Enter product price' 
                 required />  

            </div>
            </div>

              <div  className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label>Brand</Label>
                  <Input type='text' 
                  name='brand' 
                  value={productData.brand}
                  onChange={handleChange}
                  placeholder='Enter brand name' required /> 
                </div>
              

                
                <div className='grid gap-2'>
                  <Label>category</Label>
                  <Input type='text' 
                  name='category'
                  value={productData.category}
                  onChange={handleChange}
                   placeholder='Enter category name' required /> 
                </div>
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label>Description</Label>
                  </div>
                  <Textarea  name='productDesc' 
                  value={productData.productDesc}
                  onChange={handleChange}
                  placeholder='Enter brief description of the product '/>
                   </div>
                    <ImageUpload productData={productData} setProductData={setProductData}/>
              <div/>

              <CardFooter className='flex-col gap-2'>
                <Button disabled={loading} 
                onClick={submitHandler}
                 className='w-full bg-pink-600 cursor-pointer ' type='submit'>{
                  loading ? <span className='flex gap-1 items-center '><Loader2 className='animate-spin'/> Adding Product...</span> : 'Add Product'
                 }</Button>
              </CardFooter>

              
          
        </CardContent>
       
      </Card>
      
      </div>
  )
}

export default AddProduct