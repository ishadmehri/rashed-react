import { Box, Stack, Typography, colors } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
export default function SearchResult({ results }) {
    console.log("results.products[0]")
    // console.log(results?.products[0]?.images)
    // const [notFound, setNotFount] = useState(false)
    // if (results?.category.length == 0 && results?.products.length == 0) {
    //     setNotFount(true)
    // }

    return (
        <>
            <Stack direction="column" spacing={2} sx={{ width: "100%" }} mt={4}>
                {
                    results?.products?.map(pr => <Stack key={pr._id} direction="row" sx={{ gap: "10px" }} component={Link} to={`/product/${pr._id}/${pr.slug}`}>
                        {/* <Box component="img" src={pr.images} width={100}/> */}
                        <Inventory2TwoToneIcon />
                        <Typography component="h4" variant='h5' color="#202020">{pr.name}</Typography>
                    </Stack>)
                }
                {
                   (results?.category.length == 0 && results?.products.length == 0) && <Typography component="h4" variant='h5' color={colors.red[700]}>محصولی یافت نشد</Typography>
                }
            </Stack>
        </>
    )
}
