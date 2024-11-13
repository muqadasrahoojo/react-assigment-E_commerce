import {
  Autocomplete,
  Box, Card, CircularProgress, Divider, Grid, Snackbar, SnackbarContent, TextField, Tooltip, Typography,
}
  from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./product.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Products = () => {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [categoriesOpations, setcategoriesOpations] = useState([]);
  const [categoryFilter, setcategoryFilter] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();



  console.log(isloading, "setIsloading");

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);

    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const searchHandler = (event) => {
    if (event?.target?.value === "") {
      // setProducts(dummyProducts);
    }
    const filteredArr = products?.filter((product) =>
      product?.name.toLowerCase().includes(event?.target?.value.toLowerCase())
    );
    setProducts(filteredArr);
  };




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsloading(true)
        const products = await axios.get("https://fakestoreapi.com/products");


        if (products.status === 200) {
          setIsloading(false);
          setProducts(products?.data);
          setAllProducts(products?.data);


          const filterCategories = products?.data?.map((product) => {
            return {

              label: product?.category?.toUpperCase(),
              value: product?.category,
            };
          });

          const uniqueCategories = filterCategories.filter(
            (item, index, self) => index === self.findIndex((t) => t.value === item.value)
          );

          setcategoriesOpations(uniqueCategories);




        } else {
          setIsloading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);


  useEffect(() => {
    let filteredProduct = allProducts?.filter(
      (product) => product?.category === categoryFilter?.value);

      setProducts(filteredProduct);
      console.log(filteredProduct, 'filteredProduct');
      


  }, [categoryFilter])

  return (
    <>
      <Box className="container mt-3 d-flex justify-content-between">
        <TextField
          onChange={searchHandler}
          size="small"
          placeholder="Search items..."
        />
        <Autocomplete
          size='small'
          disablePortal
          onChange={(e, newValue) => {
            setcategoryFilter(newValue);
          }}
          options={categoriesOpations}
          sx={{ width: 260 }}
          renderInput={(params) => <TextField {...params} label="Categories" />}
        />
      </Box>




      <Snackbar

        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box className="d-flex justify-content-between">
              <span id="client-snackbar">Product already in cart list</span>
              <CloseIcon sx={{ float: "right" }} onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>

      {isloading ?
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box> : <Grid container className="container mt-3">
          {products?.map((product, index) => {
            return (
              <Grid item xs={12} md={3} mb={2}>
                <Card

                  key={index}
                  sx={{ padding: "20px", cursor: "pointer", width: "290px" }}
                >
                  <Box>
                    <Box className="text-center">
                      <img
                        style={{ maxHeight: "100px ", minHeight: "160px" }}
                        className="product-image"
                        width={100}
                        src={product.image}
                        alt={product.title}
                      />
                    </Box>
                    <Tooltip title={product?.title} placement="top">
                      <Typography variant="body1" className="mt-3">
                        {product?.title?.length >= 22 ? `${product.title?.slice(0, 18)}...` : product.title}
                      </Typography>
                    </Tooltip>
                    <Divider sx={{ borderColor: "#333" }} variant="fullwidth" />
                    <Box className="d-flex justify-content-between mt-2">
                      <Tooltip title="Product Details">
                        <VisibilityIcon sx={{ color: "#26305b" }} onClick={() => {
                          navigate(`/product-details/${product?.id}`);
                          // console.log(product);

                        }} />
                      </Tooltip>
                      <Tooltip title="Add to favorite">
                        <FavoriteBorderIcon sx={{ color: "#9B7BE9" }} />
                      </Tooltip>

                      <Tooltip title="Add to cart">
                        <AddShoppingCartIcon sx={{ color: "#26305b" }} onClick={() => cartHandler(product)} />
                      </Tooltip>

                    </Box>
                  </Box>
                </Card>
              </Grid>
            );
          })}


        </Grid>}
    </>
  );
};

export default Products;

