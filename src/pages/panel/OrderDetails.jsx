import { Button, Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, colors, Alert } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PanelSidebar from './PanelSidebar'
import { AuthContext } from '../auth/AuthContext'
import { useParams } from 'react-router-dom'

export default function OrderDetails() {
    const { id } = useParams()
    const { loginUser } = useContext(AuthContext)
    const [order, setOrders] = useState()
    const [sum, setSum] = useState(0)
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (loginUser?.token) {
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/order?_id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${loginUser.token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('order')
                    console.log(data.data[0])
                    setOrders(data.data[0])
                    let sum = 0;
                    for (let i of data.data[0].orderList) {
                        sum = sum + i.price * i.quantity
                    }
                    setSum(sum)

                })
        }
    }, [loginUser])

    useEffect(() => {
        if (order) {
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user?_id=${order.userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${loginUser.token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('user')
                    console.log(data.data[0])
                    setUser(data.data[0])
                })
        }
    }, [order])
    return (
        <>
            <Stack flexDirection="row" justifyContent="flex-end">
                {/* panel sidebar */}
                <PanelSidebar />
                {/* panel Main */}
                <Stack sx={{ width: "80%", height: "100vh", backgroundColor: colors.blueGrey[50] }}>
                    <Typography component="h1" variant='h4' fontWeight={600} my={3} textAlign="center">جزئیات سفارش</Typography>

                    {/* details */}
                    <Stack flexDirection="row" flexWrap="nowrap" gap={2} m={3}>
                        <Stack sx={{ width: "68%", border: "1px solid #eee" }} elevation={1} component={Paper}>
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
                                    {order?.orderList?.map(row => <TableRow key={row.productId}>
                                        <TableCell></TableCell>
                                        <TableCell><Box component="img" src={row?.images[0]} sx={{ width: "64px" }} /></TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.price} تومان</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.price * row.quantity} تومان</TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </Stack>
                        <Stack sx={{ width: "27%", border: "1px solid #eee" }} component={Paper} p={2} gap={2}>
                            {order?.orderStatus === "fail" ? <Alert severity="error" sx={{ '& .MuiAlert-message': { width: "100%", textAlign: "center" } }}>پرداخت ناموفق</Alert> : <Alert severity="success" sx={{ '& .MuiAlert-message': { width: "100%", textAlign: "center" } }}>پرداخت موفق</Alert>}
                            <Alert severity="info" sx={{ '& .MuiAlert-message': { width: "100%", textAlign: "center" } }}>
                                <Typography component="span" fontWeight={300} fontSize="16px" textAlign="center" mx={1}>تاریخ:</Typography>
                                {new Date(order?.orderDate).toLocaleDateString("fa-IR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </Alert>


                            <Typography fontWeight={600} fontSize="36px" textAlign="center" >{sum} تومان</Typography>
                            <Typography fontWeight={600} textAlign="center">جمع کل سفارش</Typography>
                        </Stack>
                    </Stack>
                    {/* customer info */}
                    {user &&
                        <Stack component={Paper} flexDirection="row" mx={3} p={2} justifyContent="center" sx={{width:650}}>
                            <Table sx={{ minWidth: 650,'& td':{textAlign:"right"},'& td:first-child':{width:100,fontWeight:600}}} size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>نام مشتری:</TableCell>
                                        <TableCell>{user.fullName}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>ایمیل:</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>شماره تماس:</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>آدرس:</TableCell>
                                        <TableCell>{user.address}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Stack>
                    }
                </Stack>
            </Stack >
        </>
    )
}
