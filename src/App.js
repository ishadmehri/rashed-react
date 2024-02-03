// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Products from "./pages/product/Products";
import ProductDetails from "./pages/product/ProductDetails";
import Panel from "./pages/panel/Panel";
import { Error401, Error404 } from "./pages/Errors/Errors";
import { useEffect, useState } from "react";
import { AuthContext } from "./pages/auth/AuthContext";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/panel/Orders";
import ProductsPanel from "./pages/panel/ProductsPanel";
import ProductCategories from "./pages/panel/ProductCategories";
import Users from "./pages/panel/Users";
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSansX",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face{
        font-family: IranSansX;
      }
      `,
    },
    // MuiButton:{
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: 'red', // Set global background color
    //     },
    //     hover: {
    //       backgroundColor: 'red !important', // Set global hover background color
    //     },
    //   }
    // }
  },
});
function App() {
  const [loginUser, setLoginUser] = useState();
  let data = JSON.parse(localStorage.getItem("loginUser"));
  useEffect(() => {
    data && setLoginUser(data);
    console.log(data); 
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContext.Provider value={{ loginUser, setLoginUser }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact={true} element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id/:slug" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/panel" element={<Panel />} /> 
              <Route path="/cart" element={<Cart />} /> 
              <Route path="/panel/orders" element={<Orders />} /> 
              <Route path="/panel/products" element={<ProductsPanel />} /> 
              <Route path="/panel/categories" element={<ProductCategories />} />
              <Route path="/panel/users" element={<Users />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
