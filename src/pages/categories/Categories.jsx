import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Categories() {
    const [allCategories, setAllCategories] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_API_URL}/category`)
            .then(res => res.json())
            .then(data => {
                console.log(data.data)
                setAllCategories(data.data)
            })
    }, [])
    return (
        <>
            <Header />
            <Typography textAlign="center" my={5} component="h1" variant='h4' fontWeight="600">دسته بندی های فروشگاه</Typography>
            <Container>
                <Stack flexDirection="row" flexWrap="wrap" justifyContent="space-between" sx={{ '& a': { width: "31%" } }}>
                    {/* category loop */}
                    {allCategories?.map(el => <Stack key={el._id} component={Link} to={`/category/${el._id}`} flexDirection="column" justifyContent="center"
                        alignItems="center"
                        sx={{ width: '100%', mt: 2, gap: "10px", textAlign: "center", border:"1px solid #ddd",borderRadius:"7px", padding:"10px", boxSizing:"border-box"}}
                    >
                        <Box component="img" src={el.images[0]} alt={el.name} sx={{maxWidth:"100%",borderRadius:"7px"}}/>
                        <Typography component="h2" variant='h5' sx={{color:"#000"}}>دسته {el.name}</Typography>
                    </Stack>)}
                </Stack>
            </Container>
        </>
    )
}
