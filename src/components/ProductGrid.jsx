import { Box, Rating, Stack, Typography, colors } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price, slug, rating }) => {
    return (
        <Stack flexDirection="column" className='product-item' >
            <Box>
                <Box component={Link} to={`/product/${id}/${slug}`}>
                    <Box component="img" src={image} sx={{ width: "100%" }} />
                </Box>
                <Box component={Link} to={`/product/${id}/${slug}`} sx={{ textDecoration: "none", color: colors.blueGrey[900] }}>
                    <Typography textAlign="center" component="h3" variant='h5'>{name}</Typography>
                </Box>
                {/* Rating */}
                <Rating name="read-only" value={rating?.length ? rating : 0} readOnly sx={{width:"100%",justifyContent:"center"}} />
                <Typography textAlign="center">{price} تومان</Typography>
            </Box>
        </Stack>
    )
}

export default function ProductGrid({ products }) {
    const allProducts = Array.isArray(products) && products?.map(el => <ProductItem key={el._id} id={el._id} name={el.name} price={el.price} image={el.images[0]} slug={el.slug} rating={el.rating} />)

    return (
        <>
            <Stack flexDirection="row" flexWrap="wrap" justifyContent="space-between" sx={{ '& .product-item': { width: "23%", border: "1px solid #ccc", borderRadius: "10px", padding: "10px", boxSizing: "border-box" }, '& .product-item img': { transition: "all ease-in-out .5s" }, '& .product-item:hover img': { scale: "0.9" } }}>
                {allProducts}
            </Stack>

        </>)
}
