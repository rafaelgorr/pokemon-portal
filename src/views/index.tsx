import { CircularProgress } from '@mui/material'
import { useTheme } from '@mui/system'
import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import useStyles from './sharedStyles'

// const Main = lazy(() => pMinDelay(import('./Main'), 1000))
const Main = lazy(() => import('./Main'))

export const App = () => {
  const styles = useStyles(useTheme())
  return (
    <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
      <Routes>
        <Route path="*" element={<Main />} />
      </Routes>
    </Suspense>
  )
}
