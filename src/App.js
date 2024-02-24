// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
//mui-x datepicker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

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
import Categories from "./pages/categories/Categories";
import CategoryDetails from "./pages/categories/CategoryDetails";
import Search from "./components/Search";
import OrderDetails from "./pages/panel/OrderDetails";
import AddProduct from "./pages/panel/AddProduct";

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
    MuiTextField: {
      styleOverrides:{
        root: {
          // Outlined
          "& .MuiFormLabel-root": {
            left: 'unset',
            right:'26px',
            transformOrigin:'top right',
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#2e2e2e",
              borderWidth: "2px",
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "secondary.main",
                borderWidth: "3px",
              },
            }
          }
        }
      },
    },
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
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
                <Route path="/search" element={<Search />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/category/:id" element={<CategoryDetails />} />
                <Route path="/panel/orders" element={<Orders />} />
                <Route path="/panel/orders/:id" element={<OrderDetails />} />
                <Route path="/panel/products" element={<ProductsPanel />} />
                <Route path="/panel/products/add" element={<AddProduct />} />
                <Route
                  path="/panel/categories"
                  element={<ProductCategories />}
                />
                <Route path="/panel/users" element={<Users />} />
                <Route path="*" element={<Error404 />} />
              </Routes>
            </BrowserRouter>
          </AuthContext.Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
