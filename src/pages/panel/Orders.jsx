import { Button, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, colors } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PanelSidebar from './PanelSidebar'
import { AuthContext } from '../auth/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import PanelMain from './PanelMain'

export default function Orders() {
    const { loginUser } = useContext(AuthContext)
    const [orders, setOrders] = useState()
    const location = useLocation()
    useEffect(() => {
        if (loginUser?.token) {
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/order`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${loginUser.token}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('orders')
                    console.log(data.data)
                    setOrders(data.data)
                })
        }
    }, [loginUser])
    return (
        <>
            <Stack flexDirection="row" justifyContent="flex-end" >
                {/* panel sidebar */}
                <PanelSidebar location={location} />
                {/* panel Main */}
                <PanelMain>
                    <TableContainer component={Paper}>
                        <Table stickyHeader sx={{ height: "80vh", backgroundColor: "#FFF", '& th,td': { textAlign: "center" } }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>شماره سفارش</TableCell>
                                    <TableCell>تاریخ</TableCell>
                                    <TableCell>وضعیت</TableCell>
                                    <TableCell>تعداد آیتم ها</TableCell>
                                    <TableCell>نمایش</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders && orders.map(order => <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{new Date(order.orderDate).toLocaleDateString("fa-IR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</TableCell>
                                    <TableCell>{order.orderStatus === "fail" ? <Chip color="error" size="medium" label="ناموفق" variant="outlined" /> : <Chip color="success" size="medium" label="موفق" />}</TableCell>
                                    <TableCell>{order.orderList.length}</TableCell>
                                    <TableCell><Button variant="outlined" component={Link} to={`/panel/orders/${order._id}`}>نمایش سفارش</Button></TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </PanelMain>
            </Stack >
        </>
    )
}
