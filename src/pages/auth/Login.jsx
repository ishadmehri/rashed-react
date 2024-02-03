import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import Home from '../home/Home'
import { Box, Button, FormControl, InputLabel, Paper, Stack, TextField, Typography, colors } from '@mui/material'
import { Link, Navigate } from 'react-router-dom'
import styled from '@emotion/styled'
export default function Login() {
  const { loginUser, setLoginUser } = useContext(AuthContext)
  const RegisterButton = styled(Link)`
    text-align: center;
    text-decoration: none;
    color: ${colors.blue[500]}
  `;
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const handleLogin = async () => {
    console.log("email: ", email, " password: ", password)
    console.log(`${process.env.REACT_APP_BACKEND_API_URL}/user`)
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
      .then(data => {
        setLoginUser({
          token: data?.data?.token,
          ...data?.data?.user?._doc
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    loginUser && localStorage.setItem("loginUser", JSON.stringify(loginUser))
  }, [loginUser])
  return (
    loginUser?.token ? <Navigate to="/panel" /> :
      <>
        <Stack alignItems="center" justifyContent="center" height="100vh" sx={{ backgroundColor: "#eeb1c0", direction: "ltr", backgroundImage: `url(${process.env.PUBLIC_URL}'/assets/login-bg.webp')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
          <Link to="/"><Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" width="160px" /></Link>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", boxSizing: "border-box", backgroundColor: "#fff", border: "#ccc", borderRadius: "12px" }} gap={3} width="100%" maxWidth="450px" p={3} mt={3}>
            <Typography component="h1" sx={{ direction: "rtl", textAlign: "center", fontWeight: "600" }}>ورود به حساب کاربری</Typography>
            <TextField name="email" label="ایمیل" variant='outlined' helperText="ایمیل را وارد کنید." sx={{
              '& .MuiFormHelperText-root': {
                direction: 'rtl',
                textAlign: 'right'
              }
            }}
              autoComplete="off"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField name="password" label="گذرواژه" type='password' autoComplete="current-password"
              onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" disableElevation size='large' onClick={handleLogin}>ورود</Button>
            {/* <RegisterButton to="/register">ثبت نام</RegisterButton> */}
            <Button component={Link} to="/register" variant='outlined' size='large'>ثبت نام</Button>
          </Box>
        </Stack>
      </>
  )
}
