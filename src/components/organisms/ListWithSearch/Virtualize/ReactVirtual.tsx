import React, { useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import ListItemSkeleton from '../ListItemSkeleton'
import {
  IntersectionObserverParams,
  useIntersectionObserver,
} from '../useIntersectionObserver'

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {
  itemsLength: number
  renderItem: (virtualItem: Record<string, any>) => React.ReactNode
  renderLoader?: () => React.ReactChild | null
  infiniteScrollProps?: IntersectionObserverParams
}

const ReactVirtual = (props: Props) => {
  const { itemsLength, renderItem, infiniteScrollProps } = props

  const scrollRef = useRef(null)
  const { loaderRef, parentRef } = useIntersectionObserver(infiniteScrollProps)

  const rowVirtualizer = useVirtualizer({
    count: itemsLength,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 64,
  })

  return (
    <div
      ref={scrollRef}
      style={{
        height: `100%`,
        width: `100%`,
        overflow: 'auto',
      }}
    >
      <div
        ref={parentRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {(rowVirtualizer.getVirtualItems() as Record<string, any>[])
          .filter((item) => !!item)
          .map((virtualItem) => {
            return (
              <div
                key={virtualItem.index}
                ref={virtualItem.measureElement}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {renderItem(virtualItem)}
                {infiniteScrollProps && virtualItem.index >= itemsLength - 1 ? (
                  <>
                    <div ref={loaderRef} />
                    {[...Array(infiniteScrollProps.loaderCount).keys()].map((i) => (
                      <ListItemSkeleton key={i} />
                    ))}
                  </>
                ) : null}
                {/* {virtualItem.index >= itemsLength - 1 && renderLoader ? renderLoader() : null} */}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default ReactVirtual
