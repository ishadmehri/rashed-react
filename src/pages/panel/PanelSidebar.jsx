import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Link, Navigate } from 'react-router-dom'
import { Avatar, Box, Button, Chip, Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, colors } from '@mui/material'
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
// icons
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import QueueTwoToneIcon from '@mui/icons-material/QueueTwoTone';
import Face2TwoToneIcon from '@mui/icons-material/Face2TwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone';
import Diversity1TwoToneIcon from '@mui/icons-material/Diversity1TwoTone';

export default function PanelSidebar() {
    const { loginUser, setLoginUser } = useContext(AuthContext)
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Stack component="aside" flexDirection="column" sx={{ width: "20%", height: "100vh", position: "fixed", right: "0", backgroundColor: "#1a1c27", color: colors.blueGrey[50] }}>
            <Stack justifyContent="center" alignItems="center" p={2} gap={2}>
                <Avatar alt={loginUser?.fullName && loginUser.fullName} src={loginUser?.image?.length ? loginUser.image : `${process.env.PUBLIC_URL}/assets/default-avatar.jpg`} sx={{ width: 56, height: 56 }} />
                <Typography component="p">سلام {loginUser?.fullName ? loginUser.fullName : loginUser.role}</Typography>
                <Chip icon={<LocalPoliceTwoToneIcon />} label={loginUser.role} color="warning" variant="filled" size="medium"
                    sx={{ '& .MuiChip-label': { paddingRight: "0" }, '& .MuiChip-icon': { marginRight: "6px" } }}
                />
                <Button variant="outlined" onClick={() => {
                    setLoginUser(null)
                    localStorage.removeItem('loginUser')
                }}>خروج</Button>
            </Stack>
            <Divider sx={{ backgroundColor: colors.blueGrey[700] }} />
            <List
                sx={{ width: '100%', backgroundColor: "#1a1c27", display: "flex", flexDirection: "column", padding: "5px", boxSizing: "border-box", gap: "5px", '& a': { textAlign: "right" }, '& .MuiListItemIcon-root': { color: "#ffffff96", minWidth: "42px" }, "& .MuiSvgIcon-root": { width: "1.7rem", height: "1.7rem" }, '& .Mui-selected': { borderRadius: "7px", backgroundColor: `${colors.teal[800]} !important` } }}
                component="nav"
            >
                <ListItemButton component={Link} to="/panel" selected >
                    <ListItemIcon>
                        <SpeedTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="داشبورد" />
                </ListItemButton>
                <Divider sx={{ backgroundColor: colors.blueGrey[700] }} />

                <ListItemButton component={Link} to="/panel/orders"  >
                    <ListItemIcon>
                        <LocalMallTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="سفارش ها" />
                </ListItemButton>
                <Divider sx={{ backgroundColor: colors.blueGrey[700] }} />

                {/* products */}
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <Inventory2TwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="محصولات" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding>
                        <ListItemButton >
                            <ListItemIcon>
                                <QueueTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="افزودن محصول" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/panel/products">
                            <ListItemIcon>
                                <BallotTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="همه محصولات" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/panel/categories">
                            <ListItemIcon>
                                <CategoryTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="دسته بندی ها" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <Divider sx={{ backgroundColor: colors.blueGrey[700] }} />

                {/* users */}
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <Face2TwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="کاربران" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit >
                    <List component="div" disablePadding >
                        <ListItemButton component={Link} >
                            <ListItemIcon>
                                <BadgeTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="پروفایل" />
                        </ListItemButton>
                        <ListItemButton component={Link}>
                            <ListItemIcon>
                                <GroupAddTwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="کاربر جدید" />
                        </ListItemButton>
                        <ListItemButton component={Link} to="/panel/users" >
                            <ListItemIcon>
                                <Diversity1TwoToneIcon />
                            </ListItemIcon>
                            <ListItemText primary="همه کاربران" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Stack>
    )
}
