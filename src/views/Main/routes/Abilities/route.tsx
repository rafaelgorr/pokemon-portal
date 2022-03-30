import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'

import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/system'

import { useStyles } from './styles'

const Home = lazy(() => import('./Abilities'))
const Details = lazy(() => import('./Details'))

export const ABILITIES_PATHS = {
  home: '/',
  details: '/details',
}

type AbilityLocationState = {
  id: string
}

interface Props {}

const Dashboard = (props: Props) => {
  const styles = useStyles(useTheme())

  const DetailsElement = () => {
    const location = useLocation()
    const locationState = location?.state as AbilityLocationState
    if (locationState.id) return <Details abilityId={locationState.id} />
    else return <Navigate replace to={ABILITIES_PATHS.home} />
  }

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
