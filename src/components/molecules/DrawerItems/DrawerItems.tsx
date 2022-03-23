import React from 'react'
import { Location, useLocation, useNavigate } from 'react-router-dom'

import { Box, ListItemProps, SvgIconProps, Typography } from '@mui/material'
import List from '@mui/material/List'
import { useTheme } from '@mui/system'

import { useStyles } from './styles'

export interface DrawerItem {
  label: string
  path: string
  Icon: React.ComponentType<SvgIconProps>
}

export const mapPathToTitle = (drawerListItems: DrawerItem[], path: string) => {
  return drawerListItems.find((dL) => dL.path === path)?.label || ''
}

interface Props {
  sx?: ListItemProps['sx']
  toggleDrawer?: () => void
  drawerListItems: DrawerItem[]
}

const isCurrentPath = (location: Location, path: string) => {
  const result = location.pathname.replace(/(\/.*?)\/(.*?)$/g, '$1') === path
  return result
}

const DrawerItems = (props: Props) => {
  const styles = useStyles(useTheme())
  const { sx, toggleDrawer, drawerListItems } = props
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = (path: string) => () => {
    navigate(path)
    toggleDrawer && toggleDrawer()
  }

  const miniItemComponent = (label: string, path: string, Icon: DrawerItem['Icon']) => {
    const isCurrPath = isCurrentPath(location, path)
    return (
      <Box
        key={path}
        sx={{
          ...styles.miniListItem,
          ...sx,
        }}
        id={label}
        onClick={handleClick(path)}
      >
        <Icon color={isCurrPath ? 'primary' : 'info'} sx={styles.miniItemIcon} />
        <Typography sx={isCurrPath ? styles.miniItemLabelSelected : styles.miniItemLabel}>
          {label}
        </Typography>
      </Box>
    )
  }

  return (
    <List sx={styles.list}>
      {drawerListItems.map((item) => miniItemComponent(item.label, item.path, item.Icon))}
    </List>
  )
}

export default DrawerItems
export type { Props as DrawerItemProps }
