import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { Box, Button, Container, Rating, Snackbar, Stack, TextField, Typography, colors } from '@mui/material'
import ProductImageSlider from './ProductImageSlider'
import { AuthContext } from '../auth/AuthContext'

export default function ProductDetails() {
  const { loginUser } = useContext(AuthContext)
  const slug = useParams().slug
  const id = useParams().id
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  //snackBar
  const [snackbarOption,setSnackbarOption]=useState({
    open:false,
    message:"",
  })
  const handleClose = (e,reason)=>{
    if(reason === 'clickaway') return;
    setSnackbarOption({...snackbarOption,open:false})
}
  //add to cart
  const addToCart = async () => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${loginUser?.token}`
      },
      body: JSON.stringify({
        productId: product?._id,
        quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.success) {
          setSnackbarOption({...snackbarOption,open:true,message:"محصول به سبد خرید اضافه شد"})
        }
      })
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/product/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data.data))
  }, [])
  return (
    <>
      {console.log(loginUser?.token)}
      <Header />
      <Container>
        <Stack flexDirection="row" flexWrap="nowrap" justifyContent="space-between" sx={{ margin: "5em 0" }}>
          {/* Product gallery */}
          <Box sx={{ width: "47%", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
            <Box component="img" src={product?.images[0]} alt={product?.name} height={450} />
          </Box>
          {/* Product info */}
          <Stack flexDirection="column" sx={{ width: "47%", gap: "20px" }} >
            <Typography component="h1" variant='h2'>{product?.name}</Typography>
            {/* Rating */}
            <Rating name="read-only" value={product?.rating ? product?.rating.length : 0} readOnly size='large' />
            <Typography component="h1" variant='h3'>{product?.price} تومان</Typography>
            {product?.discountPrice && <Typography component="h1" variant='h4'>{product.discountPrice} تومان</Typography>}
            <Typography component="h1" variant='h5' sx={{ color: product?.quantity < 5 ? colors.pink[500] : colors.lightGreen[500] }}>موجودی انبار: {product?.quantity} عدد</Typography>
            {/* Buttons */}
            <Stack flexDirection="row" flexWrap="nowrap" sx={{ gap: "10px", width: "100%" }}>
              <TextField type='number' defaultValue={1} inputProps={{ min: "1", max: product?.quantity }} sx={{ '& .MuiInputBase-input': { textAlign: "center" } }} onChange={e => setQuantity(e.target.value)} />
              <Button variant="contained" disableElevation sx={{ backgroundColor: "#000" }} onClick={addToCart}>افزودن به سبد خرید</Button>
            </Stack>
            <Snackbar
              open={snackbarOption.open}
              autoHideDuration={2000}
              message={snackbarOption.message}
              onClose={handleClose}
            />

          </Stack>
        </Stack>
      </Container>
    </>
  )
}
