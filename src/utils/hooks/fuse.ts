import Fuse from 'fuse.js'
import { useMemo, useState } from 'react'

export const getFuseOptions = (
  ...keys: Array<keyof Record<string, any>>
): Fuse.IFuseOptions<Record<string, any>> => ({
  shouldSort: false,
  threshold: 0.4,
  location: 0,
  distance: 10,
  minMatchCharLength: 1,
  isCaseSensitive: false,
  keys,
})

type Input<T extends Record<string, any>> = {
  items: T[]
  fuseKeys: Array<keyof T>
}

export const useFuse = <T extends Record<string, any>>(input: Input<T>) => {
  const { items, fuseKeys } = input

  const fuseOptions: Fuse.IFuseOptions<T> = useMemo(
    () => getFuseOptions(...(fuseKeys as string[])),
    [],
  )
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items])

  // const [isPending, startTransation] = useTransition()
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (search) return fuse.search(search).map(({ item }) => item)
    return items
  }, [search, items])

  const handleSearch: typeof setSearch = (value) => {
    setSearch(value)
  }

  return { search, setSearch: handleSearch, filteredItems }
}
