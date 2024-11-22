
import { Button, ButtonGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from '../../slices/products/ProductsSlice';


const CartList = (props) => {
    const { open, toggleDrawer } = props;


    const { items } = useSelector((state) => state.products)

    const dispatch = useDispatch()

    // console.log(items, "products");


    // const [cartItems, setCartItems] = useState([]);

    // console.log(cartItems);


    // useEffect(() => {
    //     const cartItemsArr = localStorage.getItem("cartList");
    //     const parseCartItemsArr = JSON.parse(cartItemsArr)


    //     setCartItems(parseCartItemsArr);

    // }, [])

    return (
        <div>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 500 }} role="presentation"
                >
                    <Typography variant="h5">Products List</Typography>

                    {
                        items?.map((item) => {
                            return (

                                <Box className="align-align-items-center mt-4">
                                    <img width="70px" src={item.image} alt="" />

                                    <span className='ms-3 '>{item?.title?.length >= 15 ? `${item.title?.slice(0, 15)}...` : item.title}</span>
                                    <ButtonGroup className='ms-5' size='small' variant="text" aria-label="Basic button group">
                                        <Button>< RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))} /></Button>
                                        <Button>{item?.quantity}</Button>
                                        <Button>< AddIcon onClick={()=> dispatch(increaseQuantity(item))} /></Button>
                                    </ButtonGroup>
                                    <span className='ms-5'>{item.price}</span>

                                </Box>

                            )
                        })
                    }



                </Box>
            </Drawer>
        </div>
    );
}

export default CartList;