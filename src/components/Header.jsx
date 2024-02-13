import { Box, Container, Drawer, FormControl, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography, css } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as SearchIcon } from './../assets/magnifying-glass.svg';
import { ReactComponent as UserIcon } from './../assets/user.svg';
import { ReactComponent as FavoritesIcons } from './../assets/heart.svg';
import { ReactComponent as CartIcon } from './../assets/bag-shopping.svg';
import CloseIcon from '@mui/icons-material/Close';
import SearchResult from './SearchResult';
const Header = () => {
    const [activeSearch, setActiveSearch] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    const [results, setResult] = useState()
    useEffect(() => {
        searchInput?.length > 0 && fetch(process.env.REACT_APP_BACKEND_API_URL + '/search', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "query": searchInput })
        })
            .then(res => res.json())
            .then(data => {
                setResult(data.data)
                console.log("search",data.data.products)
            })
            
    }, [searchInput])
    return (
        <>
            <Stack sx={{ borderBottom: "1px solid #cdcdcd" }} flexWrap="nowrap" py={1} px={2} component={'header'} direction={"row"} alignItems={"center"} gap={5} justifyContent={"space-between"}>
                <Box>
                    <Link to="/">
                        <Box component="img" src={process.env.PUBLIC_URL + '/assets/logo.png'} width={'180px'} />
                    </Link>
                </Box>
                <Box component={'nav'} sx={{ display: "flex", gap: "40px", flexDirection: "row", justifyContent: "center", "a": { textDecoration: "none" } }}>
                    <Link to="/products">محصولات</Link>
                    <Link to="/categories">دسته بندی ها</Link>
                    <Link to="/blog">بلاگ</Link>
                    <Link to="/about">درباره ما</Link>
                    <Link to="/contact">تماس با ما</Link>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "16px", "a": { display: "block", width: "20px" } }}>
                    {/* <Link to="/search">
                        <SearchIcon />
                    </Link> */}
                    <Link onClick={() => setActiveSearch(true)}>
                        <SearchIcon />
                    </Link>
                    <Drawer anchor='top' open={activeSearch} onClose={() => setActiveSearch(false)} sx={{ '& .MuiDrawer-paper': { height: "100vh" } }}>
                        <Stack direction="column" alignItems="center" sx={{ height: "100%", minWidth: "650px", margin: "0 auto", marginTop: "10%" }}>
                            {/* <TextField id="standard-basic" label="جستجو..." variant="standard" fullWidth color="success"/> */}
                            <IconButton size='large' variant="outlined" sx={{position:"absolute", top:"0",left:0, borderRadius:0,color:'#fff',background:"#000",'&:hover':{background:"#bbb",color:"#000"}}} onClick={()=>{
                                setActiveSearch(false)
                                setResult(null)
                            }}>
                                <CloseIcon/>
                            </IconButton>
                            <FormControl variant="standard" fullWidth >
                                <InputLabel htmlFor="search-input" sx={{ right: "0", left: "unset" }}>
                                    جستجو...</InputLabel>
                                <Input id="search-input" onChange={e => setSearchInput(e.target.value)} />
                            </FormControl>
                            {/* Search Result */}
                            {results && <SearchResult results={results} />}
                        </Stack>
                    </Drawer>
                    <Link to="/login">
                        <UserIcon />
                    </Link>
                    <Link to="/favorites">
                        <FavoritesIcons />
                    </Link>
                    <Link to="/cart">
                        <CartIcon />
                    </Link>

                </Box>
            </Stack>

        </>
    )
}
export default Header