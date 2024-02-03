import { Stack, colors } from '@mui/material'
import React from 'react'
import PanelSidebar from './PanelSidebar'

export default function ProductsPanel() {
    return (
        <>
            <Stack flexDirection="row" justifyContent="flex-end">
                {/* panel sidebar */}
                <PanelSidebar />
                {/* panel Main */}
                <Stack sx={{ width: "80%", height: "100vh", backgroundColor: colors.blueGrey[50] }}>

                </Stack>
            </Stack >
        </>
    )
}
