// import React from 'react'
// import { Input } from './ui/input'
// import { Button } from './ui/button'
// import { useDispatch } from 'react-redux'
// // import { post } from '../utils/api'
// import axios from 'axios'
// import { setCart } from '@/redux/productSlice'
// import { toast } from 'sonner'
// function ProductDesc({ product }) {
//   const accessToken = localStorage.getItem('accessToken') 
//   const dispatch = useDispatch()
//   const addToCart = async (productId) => {
//      try {
//             const res = await axios.post('http://localhost:8000/api/cart/add',{productId},
//         {
//             headers:{
//                Authorization:`Bearer ${accessToken}`
//             }
//           })
//             if (res.data.success){
//                toast.success(res.data.message )
//                dispatch(setCart(res.data.cart))
//             }

//           }
//      catch(error) {
//       console.error('Error adding to cart:', error);  
//      }
//   }
//   return (
//     <div className='flex flex-col gap-4'>
//       <div className='font-bold text-4xl text-gray-800 '>{product.productName}</div>
//      <p className='text-gray-800'>{product.category} |{product.brand}</p>
//      <h2 className='text-pink-500 font-bold text-2xl'>₹{product.productPrice}</h2>
//      <p className='line-clamp-12 text-muted-foreground'>{product.productDesc}</p>
//      <div className='flex gap-2 items-center w-[300px] '>
//       <p className='text-gray-500 font-semibold'>Quantity : </p>
//      <Input type='number' min={1} defaultValue={1} value={qty}className='w-14'></Input>
//      </div>
//      <Button onClick={() => addToCart(product._id)} className='bg-pink-600 w-max'>Add to Cart</Button>
//     </div>
//   )
// }

// export default ProductDesc
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCart } from '@/redux/productSlice'
import { toast } from 'sonner'

function ProductDesc({ product }) {
  if (!product) return null

  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)

  const addToCart = async (productId) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/cart/add',
        { productId, quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(setCart(res.data.cart))
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4 ml-4 mt-3">
      <div className="font-bold text-4xl text-gray-800">
        {product.productName}
      </div>

      <p className="text-gray-800">
        {product.category} | {product.brand}
      </p>

      <h2 className="text-pink-500 font-bold text-2xl">
        ₹{product.productPrice}
      </h2>

      <p className="line-clamp-12 text-muted-foreground">
        {product.productDesc}
      </p>

      <div className="flex gap-2 items-center w-[300px]">
        <p className="text-gray-500 font-semibold">Quantity :</p>
        <Input
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(e.target.value)}
          className="w-14"
        />
      </div>

      <Button
        onClick={() => addToCart(product._id)}
        className="bg-pink-600 w-max"
      >
        Add to Cart
      </Button>
    </div>
  )
}

export default ProductDesc