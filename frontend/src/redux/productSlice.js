// import { createSlice } from "@reduxjs/toolkit";

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     products: [],
//     cart:[],
//   },
//   reducers: {
//     setProducts: (state, action) => {
//       state.products = action.payload;
//     },
//     setCart:(state , action) => {
//       state.cart  = action.payload;
//     }
//   },
// });
// export const { setProducts, setCart } = productSlice.actions;
// export default productSlice.reducer;import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    cart: [], 
    addresses:[],
    selectedAddress:null,  //currently chosen address
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addAddress:(state , action) => {
      if (!state.addresses) state.addresses = [];
      state.addresses.push(action.payload);
    },
    setSelectedAddress:(state, action) => {
      state.selectedAddress = action.payload;
    },
    deleteAddress:(state ,action) => {
      state.addresses = state.addresses.filter((_,index) => index !== action.payload);
    // reset selected address if the deleted one was selected
      if(state.selectedAddress === state.addresses[action.payload]){
        state.selectedAddress = null;
      }
    
    }
    
    // clearCart: (state) => {
    //   state.cart = null;
    // },
  }
  
});

export const { setProducts, setCart, addAddress, setSelectedAddress, deleteAddress } = productSlice.actions;
export default productSlice.reducer;
