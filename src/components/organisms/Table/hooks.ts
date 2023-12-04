import { useEffect, useState } from 'react'

export const useCollapseRow = <T extends { id: string }>(data: T[], collapse: boolean) => {
  const [collapses, setCollapses] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (data.length)
      setCollapses(
        Object.values(data).reduce((clls, dt) => ({ ...clls, [dt.id]: !!collapses[dt.id] }), {}),
      )
    else setCollapses({})
  }, [data])

  const setCollapse = (id: string) => {
    setCollapses({ ...collapses, [id]: !collapses[id] })
  }

  return { collapses, setCollapse }
}
