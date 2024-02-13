import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Container, Typography } from '@mui/material'
import ProductGrid from '../../components/ProductGrid'

export default function Products() {
  const [products, setProducts] = useState()
  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND_API_URL + '/product')
      .then(res => res.json())
      .then(data => setProducts(data.data))
  }, [])
  return (
    <>
      <Header />
      <Container>
        <Typography textAlign="center" my={5} component="h1" variant='h4' fontWeight="600">محصولات</Typography>
        {products && <ProductGrid products={products} />}
      </Container>
    </>
  )
}
