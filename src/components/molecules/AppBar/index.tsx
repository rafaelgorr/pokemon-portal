import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Theme } from '@mui/material/styles'
import { useTheme } from '@mui/system'
import { createSxStyles } from '@pokemon-portal/src/views/theme'
import React from 'react'

import { Toolbar, ToolbarProps } from './Toolbar'

const useStyles = (theme: Theme) => {
  return createSxStyles({
    appBar: {
      height: theme.mixins.toolbar.minHeight,
    },
    content: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
  })
}

type BaseType = Omit<ToolbarProps, 'classes' | 'nav'>

export interface AppBarProps extends BaseType {
  position?: MuiAppBarProps['position']
  sx?: MuiAppBarProps['sx']
  children?: React.ReactNode
  onNavClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
  style?: MuiAppBarProps['style']
}

const AppBar = ({
  sx,
  position = 'static',
  actions,
  title,
  onNavClick,
  style,
}: AppBarProps) => {
  const styles = useStyles(useTheme())

  return (
    <MuiAppBar
      sx={{ ...styles.appBar, ...sx }}
      position={position}
      style={style}
    >
      <Toolbar title={title} actions={actions} /*nav={nav}*/ />
    </MuiAppBar>
  )
}

export { AppBar }
