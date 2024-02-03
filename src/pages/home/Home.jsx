import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import CategorySlider from '../../components/CategorySlider'
import { Container, Typography } from '@mui/material'
import ProductGrid from '../../components/ProductGrid'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/category`)
      .then(res => res.json())
      .then(data => setCategories(data.data))
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/product`)
      .then(res => res.json())
      .then(data => setProducts(data.data))
  }, [])
  return (
    <>
      <Header />
      <Slider />
      <Container sx={{marginBottom:"3em"}}>
        <Typography component="h2" variant='h4' fontWeight="700" textAlign="center" my={5}> دسته بندی های سایت</Typography>
        <CategorySlider categories={categories} />
        <Typography component="h2" variant='h4' fontWeight="700" textAlign="center" my={5}> جدید ترین محصولات</Typography>
        <ProductGrid products={products} />
      </Container>


      {console.log(categories)}
    </>
  )
}
