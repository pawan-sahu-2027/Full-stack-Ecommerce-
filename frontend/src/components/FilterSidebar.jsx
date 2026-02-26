import { Label } from "@radix-ui/react-label";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function FilterSidebar({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  allProducts,
  priceRange,
  setPriceRange,
}) {
  const Categories = allProducts.map((p) => p.category);
  const uniqueCategory = ["All", ...new Set(Categories)];
  const Brands = allProducts.map((p) => p.brand);
  const uniqueBrand = ["All", ...new Set(Brands)];

  const handleCatagoryClick = (val) => {
    setCategory(val);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };
  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resatFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };
  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64">
      {/* search filters */}
      <Input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />
      {/* Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {uniqueCategory.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={category === item}
              onChange={() => handleCatagoryClick(item)}
            />
            <label>{item}</label>
          </div>
        ))}
      </div>
      {/* Brands */}
      <h1 className="mt-5 font-semibold text-xl">Brands</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md "
        value={brand}
        onChange={handleBrandChange}
      >
        {uniqueBrand.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* price range */}
      <h1 className="mt-5 font-semibold text-xl mb-3"></h1>
      <div className="flex flex-col gap-2">
        <label>
          price Range ₹.{priceRange[0]} - ₹.{priceRange[1]}
        </label>
        <div className=" flex gap-2 items-center">
          <input
            type="number"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-20 p-1 border border-gray-300 rounded"
          ></input>
          <span>-</span>
          <input
            type="number"
            min="0"
            max="99999"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-20 p-1 border border-gray-300 rounded"
          ></input>
        </div>
        <input type="range"
         min="0" 
         max="5000" 
         step="100"
         className="w-full"
         onChange={handleMinChange}
          value={priceRange[0]}
        />
        <input
          type="range"
          min="0"
          max="999999"
          step="100"
          className="w-full"
          onChange={handleMaxChange}
        />
      </div>
      {/* Reset Button */}

      <Button
      onClick={resatFilters}
       className="bg-pink-600 text-white pt-5 cursor-pointer">
        Reset Filter
      </Button>
    </div>
  );
}

export default FilterSidebar;
