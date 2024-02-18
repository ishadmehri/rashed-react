import { Stack, colors } from '@mui/material'
import React from 'react'
import PanelSidebar from './PanelSidebar'
import { useLocation } from 'react-router-dom'
import PanelMain from './PanelMain'
import TinyEditor from '../../components/TinyEditor'

export default function ProductsPanel() {
    const location= useLocation()
    return (
        <>
            <Stack flexDirection="row" justifyContent="flex-end">
                {/* panel sidebar */}
                <PanelSidebar location={location}/>
                {/* panel Main */}
                <PanelMain>
                    <TinyEditor></TinyEditor>
                </PanelMain>
            </Stack >
        </>
    )
}
