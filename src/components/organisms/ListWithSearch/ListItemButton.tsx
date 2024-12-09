import {
  Avatar,
  AvatarProps,
  Box,
  ListItemAvatar,
  ListItemText,
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/system'
import React, { forwardRef } from 'react'

import { useStyles } from './styles'

type ExtendedProps = MuiListItemButtonProps & {
  avatarSrc?: AvatarProps['src']
}

export interface ListItemButtonProps extends ExtendedProps {
  id: string
  primary: string
  secondary?: string
}

export const ListItemButton = forwardRef<typeof MuiListItemButton, ListItemButtonProps>((props, ref) => {
  const styles = useStyles(useTheme())
  const { primary, secondary, id, avatarSrc, ...listItemButtonProps } = props
  return (
    <MuiListItemButton {...listItemButtonProps} id={`conversation-item-${id}`} ref={ref as any} sx={styles.listItem}>
      <ListItemAvatar>
        <Avatar alt={id} src={avatarSrc} sx={styles.avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={primary}
        secondaryTypographyProps={{ component: 'span' }}
        secondary={
          secondary ? (
            <Box sx={{ display: 'flex' }}>
              <Typography sx={{ wordBreak: 'break-word' }}>{secondary}</Typography>
            </Box>
          ) : undefined
        }
      />
    </MuiListItemButton>
  )
})
