import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Box, Container, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import Header from '../../components/Header'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Cart() {
    const { loginUser, setLoginUser } = useContext(AuthContext)
    //handle cart item changes
    const handleChange = async (productId, quantity) => {
        console.log(productId, quantity)
        fetch(`${process.env.REACT_APP_BACKEND_API_URL}/cart`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginUser?.token}`
            },
            body: JSON.stringify({ productId, quantity })
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }
    // get user cart from server
    useEffect(() => {
        loginUser?.token && fetch(`${process.env.REACT_APP_BACKEND_API_URL}/cart`, {
            method: "GET",
            headers: {  
                "Content-Type": "application/json",
                "Authorization": `Bearer ${loginUser?.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLoginUser({ ...loginUser, cart: data.cart })
            })
    }, [loginUser?.token])
useEffect(()=>{
    localStorage.setItem("loginUser", JSON.stringify(loginUser))
    console.log('localstorage updated because of cart change')
},[loginUser?.cart])
    return (
        <>
            <Header />
            <Container>
                <Typography my={5} component={"h1"} variant='h4' textAlign={"center"} fontWeight={600}>سبد خرید</Typography>
                <Stack>
                    <Stack sx={{ width: "70%", border: "1px solid #eee" }} elevation={1}>
                        {/* <Typography>تعداد آیتم های کارت{loginUser?.cart?.length}</Typography> */}
                        <Table sx={{ '& .MuiTableCell-root': { textAlign: "center" }, '& .MuiTableCell-head': { fontWeight: "600" } }}>
                            <TableHead >
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>تصویر محصول</TableCell>
                                    <TableCell>نام محصول</TableCell>
                                    <TableCell>قیمت</TableCell>
                                    <TableCell>تعداد</TableCell>
                                    <TableCell>جمع</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loginUser?.cart?.length > 0 && loginUser.cart.map(row => <TableRow key={row.productId}>
                                    <TableCell><HighlightOffIcon data-productid={row.productId} onClick={e => handleChange(e.target.getAttribute('data-productid'), 0)} /></TableCell>
                                    <TableCell><Box component="img" src={"row?.images[0]"} sx={{ width: "64px" }} /></TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price} تومان</TableCell>
                                    <TableCell>
                                        <TextField type='number'
                                            defaultValue={row.quantity} inputProps={{ min: "1", 'data-productid': row.productId }} sx={{ '& .MuiInputBase-input': { textAlign: "center" } }} onChange={(e) => handleChange(e.target.getAttribute('data-productid', e.target.value), e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>{row.price * row.quantity} تومان</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </Stack>
                    <Stack sx={{ width: "27%", border: "1px solid #eee" }}>

                    </Stack>
                </Stack>
            </Container>
        </>
    )
}
