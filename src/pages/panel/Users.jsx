import { Paper, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, colors } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import PanelSidebar from './PanelSidebar'
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../auth/AuthContext';

export default function Users() {

    const { loginUser, setLoginUser } = useContext(AuthContext)
    const [userRows, setUserRows] = useState([])
    useEffect(() => {
        console.log('loginUser.token')
        console.log(loginUser?.token)
        if (loginUser?.token) {
            fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user`, {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjNmNzM3Zjg5ZDA1OTNjZTcwYmYwNiIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzA3Nzc3NzgwfQ.dPXbF6H31t5mPkPlBFu5ZkeM84Jh29NO14LDn23WzwA"
                }
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data.data)
                    setUserRows(data.data)
                })
                .catch(err => console.log(err))

        }
    }, [loginUser?.token])
    return (
        <>
            <Stack flexDirection="row" justifyContent="flex-end">
                {/* panel sidebar */}
                <PanelSidebar />
                {/* panel Main */}
                <Stack sx={{ width: "80%", height: "100vh", backgroundColor: colors.blueGrey[50] }}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader  sx={{ height: "80vh", backgroundColor: "#FFF",'& th,td':{textAlign:"center"} }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>نام و نام خانوادگی</TableCell>
                                    <TableCell>موبایل</TableCell>
                                    <TableCell>ایمیل</TableCell>
                                    <TableCell>نقش کاربری</TableCell>
                                    <TableCell>فروشنده</TableCell>
                                    <TableCell>شناسه</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userRows && userRows.map(user => <TableRow key={user._id}>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell><Switch defaultChecked={user.shopkeeperConfirmed}  /></TableCell>
                                    <TableCell>{user._id}</TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Stack>
            </Stack >
        </>
    )
}
