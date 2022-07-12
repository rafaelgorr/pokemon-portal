import { useEffect, useRef } from 'react'

export type IntersectionObserverParams = {
  interObserverCallback: ConstructorParameters<typeof IntersectionObserver>[0]
  interObserverOptions?: ConstructorParameters<typeof IntersectionObserver>[1]
  loaderCount: number
}

export const useIntersectionObserver = (params?: IntersectionObserverParams) => {
  const intersectObsRef = useRef<IntersectionObserver | null>(null)

  const loaderRef = useRef(null)

  const parentRef = useRef(null)

  useEffect(() => {
    if (params) {
      const options: IntersectionObserverParams['interObserverOptions'] =
        params.interObserverOptions ?? {
          root: parentRef.current,
          rootMargin: '20px',
          threshold: 1,
        }
      intersectObsRef.current = new IntersectionObserver(params.interObserverCallback, options)

      return () => intersectObsRef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    if (loaderRef.current) intersectObsRef.current?.observe(loaderRef.current)
  }, [loaderRef.current, intersectObsRef.current])

  return { intersectObsRef, loaderRef, parentRef }
}
