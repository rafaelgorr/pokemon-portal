import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/system'
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import DetailsElement from './Details'
import { useStyles } from './styles'

const Home = lazy(() => import('./Abilities'))

export const ABILITIES_PATHS = {
  home: '/',
  details: '/details',
}

interface Props {}

const Dashboard = (props: Props) => {
  const styles = useStyles(useTheme())

  return (
    <Box sx={styles.container}>
      <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
        <Routes>
          <Route path={ABILITIES_PATHS.home} element={<Home />} />
          <Route path={ABILITIES_PATHS.details} element={<DetailsElement />} />
          <Route path="*" element={<Navigate replace to={ABILITIES_PATHS.home} />} />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default Dashboard
