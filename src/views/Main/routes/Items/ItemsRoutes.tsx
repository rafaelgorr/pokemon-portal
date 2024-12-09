import { Box, CircularProgress, useTheme } from '@mui/material'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { useStyles } from './styles'

// const Items = lazy(() => import('./Items'))

export const ITEMS_PATHS = {
  home: '/',
  details: '/details',
}

type ExtendedProps = Record<string, unknown>

interface Props extends ExtendedProps {}

const ItemsRoutes = (props: Props) => {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.container}>
      <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
        <Routes>
          {/* <Route path={ITEMS_PATHS.home} element={<Items />} /> */}
          {/* <Route path={ITEMS_PATHS.details} element={<DetailsElement />} /> */}
          <Route
            path="*"
            element={<Navigate replace to={ITEMS_PATHS.home} />}
          />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default ItemsRoutes
