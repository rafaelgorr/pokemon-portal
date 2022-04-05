import Fuse from 'fuse.js'
import React, { useMemo, useState } from 'react'

import { ClearOutlined, Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  List,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/system'
import { NestedKeyOf } from '@pokemon-portal/src/utils/methods'

import { ListItem, ListItemProps } from './ListItem'
import { useStyles } from './styles'

const getFuseOptions = <T extends object>(...keys: string[]): Fuse.IFuseOptions<T> => ({
  shouldSort: false,
  threshold: 0.1,
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
  sx?: StackProps['sx']
  textFieldLabel?: string
  emptyListLabel?: string
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
    sx,
    textFieldLabel,
    emptyListLabel = 'Empty list',
  } = props

  const { getPrimary, getSecondary, getSecondaryAction, getAvatarSrc } = listItemProps

  const fuseOptions: Fuse.IFuseOptions<T> = useMemo(() => getFuseOptions(...fuseKeys), [])
  const fuse = useMemo(() => new Fuse(listItems as T[], fuseOptions), [listItems])

  // const [isPending, startTransation] = useTransition()
  const [search, setSearch] = useState('')

  const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
    // startTransation(() => {
    //   setSearch(evt.target.value)
    // })
    setSearch(evt.target.value)
  }

  const filteredItems = useMemo(() => {
    if (search) return fuse.search(search).map(({ item }) => item)
    return listItems
  }, [search, listItems])

  return (
    <Stack flexDirection="column" textAlign="center" sx={sx}>
      {textFieldLabel && (
        <Typography variant="h6" textAlign="left">
          {textFieldLabel}
        </Typography>
      )}
      <Box sx={styles.searchFieldContainer}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          value={search}
          onChange={handleChangeSearch}
          sx={{ width: '100%' }}
          focused
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearch('')}>
                  <ClearOutlined color="primary" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
          disabled={fetching}
        />
        {fetching && (
          <LinearProgress sx={{ bottom: 0, margin: 0, width: '100%', position: 'absolute' }} />
        )}
      </Box>
      <Box sx={styles.listContainer}>
        <List sx={styles.list}>
          {filteredItems.length
            ? filteredItems
                .slice(0, 100)
                .filter((item) => !!item)
                .map((item) => (
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
                ))
            : !fetching && <Typography>{emptyListLabel}</Typography>}
        </List>
      </Box>
    </Stack>
  )
}

export { ListWithSearch }
