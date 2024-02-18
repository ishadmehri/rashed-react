import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { Link, Navigate, useLocation } from 'react-router-dom'

import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import PanelSidebar from './PanelSidebar'
import { IconButton, Stack, colors } from '@mui/material'
import PanelMain from './PanelMain'

export default function Panel() {
  const location = useLocation()
  const { loginUser, setLoginUser } = useContext(AuthContext)

  const collapseStyle = { width: '100%', backgroundColor: "#1a1c27", display: "flex", flexDirection: "column", padding: "5px", boxSizing: "border-box", gap: "5px", '& a': { textAlign: "right", fontWeight: "300", fontSize: "14px !important" }, '& .MuiTypography-root': { fontSize: "14px !important" }, '& .MuiListItemIcon-root': { color: "#ffffff96", minWidth: "42px" }, "& .MuiSvgIcon-root": { width: "1.7rem", height: "1.7rem" }, '& .Mui-selected': { borderRadius: "7px", backgroundColor: `${colors.teal[800]} !important` } }
  return (
    !loginUser?.token ? <Navigate to="/login" /> :
      <>
        <Stack flexDirection="row" justifyContent="flex-end" sx={{backgroundColor: colors.blueGrey[900]}}>
          {/* panel sidebar */}
          <PanelSidebar location={location}/>
          {/* panel Main */}
          <PanelMain>
            Dashboard
          </PanelMain>
        </Stack >
      </>
  )
}
