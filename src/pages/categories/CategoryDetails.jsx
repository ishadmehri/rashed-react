import React from 'react'
import Header from '../../components/Header'
import { Typography } from '@mui/material'

export default function CategoryDetails() {
    return (
        <>
            <Header />
            <Typography textAlign="center" my={5} component="h1" variant='h4' fontWeight="600">دسته بندی های:</Typography>
        </>
    )
}
