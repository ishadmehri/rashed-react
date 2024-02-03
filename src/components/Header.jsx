import { Box, Stack, css } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent  as SearchIcon } from './../assets/magnifying-glass.svg';
import { ReactComponent  as UserIcon } from './../assets/user.svg';
import { ReactComponent  as FavoritesIcons } from './../assets/heart.svg';
import { ReactComponent  as CartIcon } from './../assets/bag-shopping.svg';
const Header = () => {
    const iconStyle = css({display:"block"})
    return (
        <>
            <Stack sx={{borderBottom:"1px solid #cdcdcd"}} flexWrap="nowrap" py={1} px={2} component={'header'} direction={"row"} alignItems={"center"} gap={5} justifyContent={"space-between"}>
                <Box>
                    <Link to="/">
                        <Box component="img" src={process.env.PUBLIC_URL + '/assets/logo.png'} width={'180px'} />
                    </Link>
                </Box>
                <Box component={'nav'} sx={{ display: "flex",gap:"40px", flexDirection: "row", justifyContent: "center","a":{textDecoration:"none"} }}>
                    <Link to="/products">محصولات</Link>
                    <Link to="/categories">دسته بندی ها</Link>
                    <Link to="/blog">بلاگ</Link>
                    <Link to="/about">درباره ما</Link>
                    <Link to="/contact">تماس با ما</Link>
                </Box>
                <Box sx={{display:"flex",alignItems:"center", gap:"16px","a":{display:"block",width:"20px"}}}>
                    <Link to="/search">
                        <SearchIcon />
                    </Link>
                    <Link to="/login">
                        <UserIcon />
                    </Link>
                    <Link to="/favorites">
                        <FavoritesIcons/>
                    </Link>
                    <Link to="/cart">
                        <CartIcon/>
                    </Link>

                </Box>
            </Stack>

        </>
    )
}
export default Header