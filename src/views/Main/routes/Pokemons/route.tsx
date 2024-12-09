import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/system'
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { useStyles } from './styles'

const Home = lazy(() => import('./Pokemons'))

export const DASHBOARD_PATHS = {
  home: '/',
}

interface Props {}

const Dashboard = (props: Props) => {
  const styles = useStyles(useTheme())
  return (
    <Box sx={styles.container}>
      <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
        <Routes>
          <Route path={DASHBOARD_PATHS.home} element={<Home />} />
          <Route
            path="*"
            element={<Navigate replace to={DASHBOARD_PATHS.home} />}
          />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default Dashboard
