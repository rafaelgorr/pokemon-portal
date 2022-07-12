import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemProps,
  ListItemText,
  Skeleton,
} from '@mui/material'
import React from 'react'

type ExtendedProps = ListItemProps

interface Props extends ExtendedProps {}

const ListItemSkeleton = (props: Props) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Skeleton variant="circular" sx={(theme) => ({ marginRight: theme.spacing(2) })}>
            <Avatar />
          </Skeleton>
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" width="100%" height="100%" sx={{ flex: 1 }} />}
        />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemSkeleton
