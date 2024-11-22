import { TextIncrease } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const ProductSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        isToast: false,
    },
    reducers: {
        addProduct: (state, action) => {
            // const { product } = action.payload;


            const isExist = state.items.find((item) => item.id === action.payload.id);

            console.log(isExist, "isExist");

            if (isExist) {
                state.isToast = true;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }




        },

        increaseQuantity: (state, action) => {

            const product = state.items.find((item) => item.id === action.payload.id);

            if (product) {
                product.quantity += 1;
            }
            console.log(product, 'productmatch');


        },

        decreaseQuantity: (state, action) => {

            const product = state.items.find((item) => item.id === action.payload.id);

            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }else{
                state.items = state.items.filter(item => item.id !== action.payload.id)
            }
          


        }


    }
});

export const { addProduct, increaseQuantity, decreaseQuantity } = ProductSlice.actions;
export default ProductSlice.reducer;
