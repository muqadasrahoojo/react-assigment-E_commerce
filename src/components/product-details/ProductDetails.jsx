import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';


const ProductDetails = () => {
  const [productDetail, setProductsDetail] = useState([]);
  const [isloading, setIsloading] = useState(false);


  const param = useParams();

  console.log(param, 'param');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsloading(true)
        const products = await axios.get(`https://fakestoreapi.com/products/${param?.product_Id}`);


        if (products.status === 200) {
          setIsloading(false);
          setProductsDetail(products?.data);
        } else {
          setIsloading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {isloading ? <Box className="text-center mt-5">
        <CircularProgress color="inherit" />
      </Box> : <Grid container className='container mt-5'>
        <Grid item md={6} >
          <img className='img-fluid text-center' width='400px' src={productDetail?.image} alt="" />
        </Grid>
        <Grid item md={6} className=''>
          <Typography sx={{ color: "#26305b" }} className='fw-semibold' variant="h3">{productDetail?.title}</Typography>
          <Typography className='mt-4 text-capitalize' variant="body1">{productDetail?.category}</Typography>
          <Typography className='mt-4' variant="body1">{productDetail?.description}</Typography>
          <Typography className='mt-4 fw-bold' variant="h6">Price: {productDetail?.price}</Typography>

          <Box className="d-flex mt-3">

            <StarBorderIcon sx={{ color: "#26305b" }} />
            <StarHalfIcon sx={{ color: "#26305b" }} />
            <StarIcon sx={{ color: "#26305b" }} />

          </Box>
          <Typography className="mt-3" variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>


            Rating:
            <span style={{ color: '#CC6666', fontWeight: 'bold', marginLeft: '5px' }}>
              {productDetail?.rating?.rate}
            </span>
            <span style={{ color: '#26305b', marginLeft: '8px', fontSize: '0.9rem' }}>
              ({productDetail?.rating?.count} reviews)
            </span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, fontWeight: 'bold', backgroundColor: '#26305b' }}

          >
            Add to Cart
          </Button>

        </Grid>
      </Grid>}
    </>
  )
}

export default ProductDetails
