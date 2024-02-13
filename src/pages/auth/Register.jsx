import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from './AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material'
export default function Register() {
  const { loginUser } = useContext(AuthContext)
  const [fields, setFields] = useState(null)
  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value })
  const [fieldsError, setFieldsError] = useState({
    password: "پسورد باید حداقل 8  کارکتر باشد.",
    email: "ایمیل ضروری است."
  })
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error"
  })
  const handleRegister = async () => {
    if (!fields || fields?.password?.length < 8 || !fields?.email) {
      setSnack({ ...snack, open: true, message: "لطفا خطاهای فرم را رفع کنید." })
      console.log(snack)
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_API_URL}/user/register`, {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({
          ...fields
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          data.status && setSnack({ open: true, message: "حساب کاربری شما ایجاد شد!", severity: "success" })
        })
    }

  }
  return (
    loginUser?.token ? <Navigate to="/panel" /> :
      <Stack alignItems="center" justifyContent="center" height="100vh" sx={{ backgroundColor: "#eeb1c0", direction: "ltr", backgroundImage: `url(${process.env.PUBLIC_URL}'/assets/login-bg.webp')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center bottom" }}>
        <Link to="/"><Box component="img" src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="logo" width="160px" /></Link>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", boxSizing: "border-box", backgroundColor: "#fff", border: "#ccc", borderRadius: "12px", '& legend': {textAlign:"left"},'& input': {direction:"ltr", textAlign:"center"} }} gap={3} width="100%" maxWidth="450px" p={3} mt={3}>
          <Typography component="h1" sx={{ direction: "rtl", textAlign: "center", fontWeight: "600" }}>ثبت نام </Typography>
          <TextField name='fullName' label="نام و نام خانوادگی" variant='outlined' onChange={handleChange} sx={{'& .MuiInputBase-input':{direction:"rtl !important"}}} direction="rtl !important"/>
          <TextField name="email" label="ایمیل" variant='outlined' sx={{
            '& .MuiFormHelperText-root': {
              direction: 'rtl',
              textAlign: 'right'
            }
          }}
            required
            autoComplete="off"
            onChange={handleChange}
          />
          <TextField name='phone' type="text" label="موبایل" variant='outlined' onChange={handleChange} required />
          <TextField name="password" label="گذرواژه" type='text' autoComplete="current-password" required onChange={handleChange} helperText="حداقل طول پسورد 8 کارکتر است" />
          <Button variant="contained" disableElevation size='large' onClick={handleRegister}>ثبت نام</Button>
          <Button component={Link} to="/login" variant='outlined' size='large'>ورود</Button>
        </Box>
        <Snackbar
          open={snack.open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ direction: "rtl" }}
          autoHideDuration={1200}
        >
          <Alert
            severity={snack.severity}
            sx={{ width: '100%', gap: "10px" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Stack>
  )
}
