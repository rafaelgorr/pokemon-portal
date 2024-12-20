import { ClearOutlined, Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { useTheme } from '@mui/system'
import { NestedKeyOf } from '@pokemon-portal/src/utils/methods'
import Fuse, { IFuseOptions } from 'fuse.js'
import React, { useMemo, useState } from 'react'

import { ListItemButton, ListItemButtonProps } from './ListItemButton'
import SentinelReactVirtual from './Virtualize/SentinelReactVirtual'
import { useStyles } from './styles'
import { IntersectionObserverParams } from './useIntersectionObserver'

// import ReactVirtual from './Virtualize/ReactVirtual'

const getFuseOptions = <T extends object>(...keys: string[]): IFuseOptions<T> => ({
  shouldSort: false,
  threshold: 0.1,
  location: 0,
  distance: 10,
  minMatchCharLength: 1,
  isCaseSensitive: false,
  keys,
})

type BaseProps<Item extends Record<string, unknown>> = {
  listItems: Item[]
  fetching?: boolean
  listItemProps: {
    getPrimary: (it: Item) => ListItemButtonProps['primary']
    getSecondary?: (it: Item) => ListItemButtonProps['secondary']
    getSecondaryAction?: (it: Item) => ListItemButtonProps['action']
    getAvatarSrc?: (it: Item) => ListItemButtonProps['avatarSrc']
  }
  selectedItem?: Item
  handleItemClick(item: Item): () => void
  fuseKeys: NestedKeyOf<Item>[]
  selectorKey?: keyof Item
  sx?: StackProps['sx']
  textFieldLabel?: string
  emptyListLabel?: string
  infiniteScrollProps?: IntersectionObserverParams
}

// const rows = new Array(10000).fill(true).map(() => 64 + Math.round(Math.random() * 150))

type Props<Item extends Record<string, unknown>> = Item extends { id: string }
  ? BaseProps<Item>
  : BaseProps<Item> & { selectorKey: keyof Item }

const ListWithSearch = <T extends Record<string, unknown> & { id: string }>(props: Props<T>) => {
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
    // emptyListLabel = 'Empty list',
    // infiniteScrollProps,
  } = props

  const { getPrimary, getSecondary, getSecondaryAction, getAvatarSrc } = listItemProps

  const fuseOptions: IFuseOptions<T> = useMemo(() => getFuseOptions(...fuseKeys), [])
  const fuse = useMemo(() => new Fuse(listItems as T[], fuseOptions), [listItems])

  const [search, setSearch] = useState('')

  // const loaderRef = useRef(null)

  // useEffect(() => {
  //   if (infiniteScrollProps) {
  //     const options: InfiniteScrollProps['interObserverOptions'] =
  //       infiniteScrollProps.interObserverOptions ?? {
  //         root: null,
  //         rootMargin: '20px',
  //         threshold: 1,
  //       }
  //     const intersectObs = new IntersectionObserver(
  //       infiniteScrollProps.interObserverCallback,
  //       options
  //     )

  //     if (loaderRef.current) intersectObs.observe(loaderRef.current)
  //   }
  // }, [])

  const handleChangeSearch: TextFieldProps['onChange'] = (evt) => {
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
          sx={styles.searchTextField}
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
        {fetching && <LinearProgress sx={styles.linearProgress} />}
      </Box>
      <SentinelReactVirtual
        itemsLength={filteredItems.length}
        renderItem={(virtualItem, ref) => {
          const item = filteredItems[virtualItem.index]
          // const isLoaderRow = virtualItem.index >= filteredItems.length - 1

          // if (isLoaderRow && infiniteScrollProps)
          //   return (
          //     <React.Fragment key={virtualItem.index}>
          //       <div ref={ref} />
          //       {[...Array(infiniteScrollProps.loaderCount).keys()].map((i) => (
          //         <ListItemSkeleton key={i} />
          //       ))}
          //     </React.Fragment>
          //   )
          return (
            <ListItemButton
              key={virtualItem.key}
              row-index={virtualItem.index}
              ref={ref as any}
              primary={getPrimary(item)}
              secondary={getSecondary?.(item)}
              onClick={handleItemClick(item)}
              selected={selectedItem?.[selectorKey] === item[selectorKey]}
              id={item[selectorKey] as string}
              action={getSecondaryAction?.(item)}
              // secondaryAction={getSecondaryAction?.(item)}
              avatarSrc={getAvatarSrc?.(item)}
              // sx={{ height: rows[virtualItem.index] }}
              sx={{ height: virtualItem.size }}
            />
          )
        }}
        // infiniteScrollProps={infiniteScrollProps}
      />
      {/* <ReactVirtual
        itemsLength={filteredItems.length}
        renderItem={(virtualItem) => {
          const item = filteredItems[virtualItem.index]
          return (
            <ListItem
              primary={getPrimary(item)}
              secondary={getSecondary?.(item)}
              onClick={handleItemClick(item)}
              selected={selectedItem?.[selectorKey] === item[selectorKey]}
              id={item[selectorKey] as string}
              secondaryAction={getSecondaryAction?.(item)}
              avatarSrc={getAvatarSrc?.(item)}
            />
          )
        }}
        // infiniteScrollProps={infiniteScrollProps}
        // renderLoader={() =>
        //   infiniteScrollProps ? (
        //     <>
        //       <div ref={loaderRef} />
        //       {[...Array(infiniteScrollProps.loaderCount).keys()].map((i) => (
        //         <ListItemSkeleton key={i} />
        //       ))}
        //     </>
        //   ) : null
        // }
      /> */}
      {/* <ReactVirtualized
          itemsLength={listItems.length}
          rowRenderer={({ key, index, isScrolling, isVisible, style }) => {
            const item = listItems[index]
            return (
              <ListItem
                primary={getPrimary(item)}
                secondary={getSecondary?.(item)}
                onClick={handleItemClick(item)}
                selected={selectedItem?.[selectorKey] === item[selectorKey]}
                id={item[selectorKey]}
                secondaryAction={getSecondaryAction?.(item)}
                avatarSrc={getAvatarSrc?.(item)}
                key={key}
                sx={style}
              />
            )
          }}
        /> */}
      {/* <Box sx={styles.listContainer}>
        <List sx={styles.list}>
          {filteredItems.length
            ? filteredItems
                // .slice(0, 100)
                .filter((item) => !!item)
                .map((item) => {
                  return (
                    <ListItem
                      key={item[selectorKey] as string}
                      primary={getPrimary(item)}
                      secondary={getSecondary?.(item)}
                      onClick={handleItemClick(item)}
                      selected={selectedItem?.[selectorKey] === item[selectorKey]}
                      id={item[selectorKey] as string}
                      secondaryAction={getSecondaryAction?.(item)}
                      avatarSrc={getAvatarSrc?.(item)}
                    />
                  )
                })
            : !fetching && <Typography>{emptyListLabel}</Typography>}
          {infiniteScrollProps ? (
            <>
              <div ref={loaderRef} />
              {[...Array(infiniteScrollProps.loaderCount).keys()].map((i) => (
                <ListItemSkeleton key={i} />
              ))}
            </>
          ) : null}
        </List>
      </Box> */}
    </Stack>
  )
}

export { ListWithSearch, Props as ListWithSearchProps }
