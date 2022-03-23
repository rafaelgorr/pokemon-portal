import React from 'react'

import { Box } from '@mui/material'
import MUIDrawer from '@mui/material/Drawer'
import { useTheme } from '@mui/system'

import DrawerItems, { DrawerItemProps } from '../DrawerItems'
import { useStyles } from './styles'

export interface Props {
  drawerOpen?: boolean
  toggleDrawer?: () => void
  logo: string
  drawerListItems?: DrawerItemProps['drawerListItems']
}

const Drawer = (props: Props) => {
  const { toggleDrawer, drawerListItems, logo } = props
  const styles = useStyles(useTheme())

  return (
    <MUIDrawer variant="permanent" anchor="left" sx={styles.drawer}>
      <Box style={styles.header}>
        <img src={logo} style={styles.headerLogo} alt="Pokemon" />
      </Box>
      {drawerListItems ? (
        <DrawerItems toggleDrawer={toggleDrawer} drawerListItems={drawerListItems} />
      ) : null}
    </MUIDrawer>
  )
}

export { Drawer }
