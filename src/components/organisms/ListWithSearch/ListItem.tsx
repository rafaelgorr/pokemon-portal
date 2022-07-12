import {
  Avatar,
  AvatarProps,
  Box,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemProps as MuiListItemProps,
  ListItemText,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/system'
import React, { forwardRef } from 'react'
import { useStyles } from './styles'

type ExtendedProps = MuiListItemProps & {
  avatarSrc?: AvatarProps['src']
}

export interface ListItemProps extends ExtendedProps {
  id: string
  primary: string
  secondary?: string
}

export const ListItem = forwardRef<typeof MuiListItem, ListItemProps>((props, ref) => {
  const styles = useStyles(useTheme())
  const { primary, secondary, id, avatarSrc, ...listProps } = props
  return (
    <MuiListItem {...listProps} id={`conversation-item-${id}`} disablePadding ref={ref as any}>
      <ListItemButton sx={styles.listItem}>
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
      </ListItemButton>
    </MuiListItem>
  )
})
