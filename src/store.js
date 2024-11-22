import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slices/add-cart/addCartSlice"
import productReducer from "./slices/products/ProductsSlice.js"


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products:productReducer,
    },
});

