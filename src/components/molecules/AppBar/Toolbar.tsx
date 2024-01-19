import { Box } from '@mui/material'
import MuiToolbar from '@mui/material/Toolbar'
import { useTheme } from '@mui/system'
import React from 'react'

import { useStyles } from './styles'

export interface ToolbarProps {
  title?: React.ReactNode
  actions?: React.ReactNode
  nav?: React.ReactNode
}

export function Toolbar({ nav, title, actions }: ToolbarProps) {
  const styles = useStyles(useTheme())
  return (
    <MuiToolbar>
      <Box sx={styles.nav}>{nav}</Box>
      {title ? <Box sx={styles.grow}>{title}</Box> : <Box sx={styles.grow} />}
      {actions}
    </MuiToolbar>
  )
}
