import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual'
import React, { useMemo, useRef } from 'react'

import { IntersectionObserverParams, useIntersectionObserver } from '../useIntersectionObserver'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  itemsLength: number
  renderItem: (virtualItem: VirtualItem, ref?: React.LegacyRef<HTMLDivElement>) => React.ReactNode
  renderLoader?: () => React.ReactNode | null
  infiniteScrollProps?: IntersectionObserverParams
}

const SentinelReactVirtual = (props: Props) => {
  const { itemsLength, renderItem, infiniteScrollProps } = props

  const scrollRef = useRef(null)
  const { loaderRef, parentRef } = useIntersectionObserver(infiniteScrollProps)

  const rowVirtualizer = useVirtualizer({
    count: itemsLength,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 64,
    overscan: 10,
    // enableSmoothScroll: false,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()
  const space = useMemo(
    () =>
      virtualItems.length > 0
        ? {
            top: virtualItems[0].start,
            bottom: rowVirtualizer.getTotalSize() - virtualItems[virtualItems.length - 1].end,
          }
        : {
            top: 0,
            bottom: 0,
          },
    [rowVirtualizer, virtualItems.length],
  )

  return (
    <div
      ref={scrollRef}
      style={{
        height: `100%`,
        width: `100%`,
        overflow: 'auto',
      }}
    >
      <div id="list" ref={parentRef}>
        <div style={{ height: space.top }} />
        {virtualItems
          .filter((item) => !!item)
          .map((virtualItem) => {
            const isLoaderRow = virtualItem.index >= itemsLength - 1

            return renderItem(virtualItem, !isLoaderRow ? undefined : loaderRef)
          })}
        <div style={{ height: space.bottom }} />
      </div>
    </div>
  )
}

export default SentinelReactVirtual
