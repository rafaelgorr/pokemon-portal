import { Box } from '@mui/material'
import MUIDrawer from '@mui/material/Drawer'
import { useTheme } from '@mui/system'
import React from 'react'

import { useStyles } from './styles'
import DrawerItems, { DrawerItemProps } from '../DrawerItems'

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
      <Box sx={styles.header}>
        <img
          src={logo}
          style={styles.headerLogo as React.CSSProperties}
          alt="Pokemon"
        />
      </Box>
      {drawerListItems ? (
        <DrawerItems
          toggleDrawer={toggleDrawer}
          drawerListItems={drawerListItems}
        />
      ) : null}
    </MUIDrawer>
  )
}

export { Drawer }
