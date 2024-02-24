import { IconButton, Stack, colors } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
export default function PanelMain(props) {
    return (
        <Stack sx={{ width: "100%", height: "100vh",overflow:"hidden"}} className='iman' alignItems="flex-end">
            <Stack sx={{ width: "80%", height: "100vh", backgroundColor: colors.blueGrey[50]}}>
                <Stack component="nav" direction="row-reverse" p={1} mb={1} sx={{ borderBottom: "1px solid #ddd" }}>
                    <Link to={'/'}><IconButton size='large'><HomeTwoToneIcon /></IconButton></Link>
                </Stack>
                <Stack component="main" m={1} sx={{overflowY:"auto",overflowX:"hidden" }} pb={1}>
                    {props.children}
                </Stack>
            </Stack>
        </Stack>
    )
}
