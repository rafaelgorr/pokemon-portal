import Fuse from 'fuse.js'
import React, { useMemo, useState } from 'react'

import { Search as SearchIcon } from '@mui/icons-material'
import { Box, InputAdornment, LinearProgress, List, Stack, TextField } from '@mui/material'
import { useTheme } from '@mui/system'
import { NestedKeyOf } from '@pokemon-portal/src/utils/methods'

import { ListItem, ListItemProps } from './ListItem'
import { useStyles } from './styles'

const getFuseOptions = <T extends object>(...keys: string[]): Fuse.IFuseOptions<T> => ({
  shouldSort: false,
  threshold: 0.4,
  location: 0,
  distance: 10,
  minMatchCharLength: 1,
  isCaseSensitive: false,
  keys,
})

type BaseProps<Item extends { id?: string }> = {
  listItems: Item[]
  fetching?: boolean
  listItemProps: {
    getPrimary: (it: Item) => ListItemProps['primary']
    getSecondary?: (it: Item) => ListItemProps['secondary']
    getSecondaryAction?: (it: Item) => ListItemProps['secondaryAction']
    getAvatarSrc?: (it: Item) => ListItemProps['avatarSrc']
  }
  selectedItem?: Item
  handleItemClick(item: Item): () => void
  fuseKeys: NestedKeyOf<Item>[]
  selectorKey?: keyof Item
}

type Props<Item> = Item extends { id: string }
  ? BaseProps<Item>
  : BaseProps<Item> & { selectorKey: keyof Item }

const ListWithSearch = <T extends Record<string, any>>(props: Props<T>) => {
  const styles = useStyles(useTheme())

  const {
    listItems,
    listItemProps,
    selectedItem,
    handleItemClick,
    fuseKeys,
    fetching,
    selectorKey = 'id',
  } = props

  const { getPrimary, getSecondary, getSecondaryAction, getAvatarSrc } = listItemProps

  const fuseOptions: Fuse.IFuseOptions<T> = useMemo(() => getFuseOptions(...fuseKeys), [])
  const fuse = useMemo(() => new Fuse(listItems as T[], fuseOptions), [listItems])

  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (search) return fuse.search(search).map(({ item }) => item)
    return listItems
  }, [search, listItems])

  return (
    <Stack flexDirection="column" textAlign="center" height="100%">
      <Box sx={styles.searchFieldContainer}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          sx={{ width: '100%' }}
          focused
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            // endAdornment: search ? (
            //   <InputAdornment position="start">
            //     <IconButton onClick={() => setSearch('')}>
            //       <ClearOutlinedIcon color="primary" />
            //     </IconButton>
            //   </InputAdornment>
            // ) : undefined,
          }}
          disabled={fetching}
        />
        {fetching && (
          <LinearProgress sx={{ bottom: 0, margin: 0, width: '100%', position: 'absolute' }} />
        )}
      </Box>
      <Box sx={styles.listContainer}>
        <List sx={styles.list}>
          {filteredItems.map((item) => (
            <ListItem
              key={item[selectorKey]}
              primary={getPrimary(item)}
              secondary={getSecondary?.(item)}
              onClick={handleItemClick(item)}
              selected={selectedItem?.[selectorKey] === item[selectorKey]}
              id={item[selectorKey]}
              secondaryAction={getSecondaryAction?.(item)}
              avatarSrc={getAvatarSrc?.(item)}
            />
          ))}
        </List>
      </Box>
    </Stack>
  )
}

export { ListWithSearch }