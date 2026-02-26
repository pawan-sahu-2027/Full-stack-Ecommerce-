import React from "react";
import FilterSidebar from "@/components/FilterSidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCart  from "@/components/ProductCart";
import { toast } from "sonner";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

function Products() {

    const [allProducts , setAllProduct] = useState([]);
    const [loading , setLoading] = useState(false);
    const [search , setSearch ] = useState('');
    const [category , setCategory] = useState('All');
    const [brand , setBrand] = useState('All');
   
    const [priceRange , setPriceRange] = useState([0 , 10000]);
   
    const {products = []} = useSelector(store => store.product);
   const [sortOrder , setSortOrder] = useState('');
   const dispatch = useDispatch();
   const getAllProducts = async() =>{
        try {
            setLoading(true);
            const res  = await axios.get("http://localhost:8000/api/v1/product/getallproducts")
           console.log("API Response:", res.data);
            if (res.data.success){
                setAllProduct (res.data.products);
                dispatch(setProducts(res.data.products));
            }else {
                setAllProduct([]);
            }
        }
        catch(error){
            console.log("Error fetching products:", error);
            toast.error("Failed to fetch products");
        }
        finally{
            setLoading(false);
        } 
    } 
    useEffect(() => {
        // if (allProducts.length === 0){
        //   return;
        // }
        
        let filtered = [...allProducts];
        if (search.trim() !== ""){
          filtered = filtered.filter(p => p.productName?.toLowerCase().includes(search.toLowerCase()))
        }
        if (category !== "All"){
          filtered = filtered.filter(p => p.category === category)
        }
        if (brand !== "All"){
          filtered = filtered.filter ( p => p.brand === brand)
        }
         filtered = filtered.filter(p => p.productPrice >= priceRange [0] && p.productPrice <= priceRange[1]);
         if (sortOrder === "lowToHigh") {
          filtered.sort((a , b) => a.productPrice - b.productPrice);

         }
          else if (sortOrder === "highToLow"){
            filtered.sort((a , b) => b.productPrice - a.productPrice);
          }
          dispatch(setProducts(filtered));
    }, [search , category , brand , priceRange , allProducts , dispatch , sortOrder]
  )

    useEffect(() => {
        getAllProducts();
    } ,[]);
  return (
    <div className="pt-24 pb-10 px-4"> {/* Added padding for small screens */}
      {/* 1. Main Flex Container - Wraps Sidebar AND Content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* 2. Sidebar Container - Fixed width on desktop */}
        <div className="w-full md:w-64 shrink-0">
          <FilterSidebar
           search={search}
            setSearch={setSearch}
             category={category}
              setCategory={setCategory}
               brand={brand} 
               setBrand={setBrand}
                allProducts={allProducts}
                 priceRange={priceRange} 
                 setPriceRange={setPriceRange} />
        </div>


        {/* 3. Main Content Area */}
        <div className="flex-1">
          {/* Sort Dropdown Row */}
          <div className="flex justify-end mb-6">
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-[200px] border shadow-sm">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
                products.map((product) =>{
                    return <ProductCart key={product._id} product={product} loading={loading} />
                })
            }
          </div>
        </div>

      </div>
    </div>
  );
}

export default Products;