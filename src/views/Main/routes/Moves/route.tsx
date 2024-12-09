import { Box, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/system'
import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'

import Details from './Details'
import { useStyles } from './styles'
import { ABILITIES_PATHS } from '../Abilities'

const Home = lazy(() => import('./Moves'))

export const MOVES_PATHS = {
  home: '/',
  details: '/details',
}

type MoveLocationState = {
  id: string
}

interface Props {}

const Dashboard = (props: Props) => {
  const styles = useStyles(useTheme())

  const DetailsElement = () => {
    const location = useLocation()
    const locationState = location?.state as MoveLocationState
    if (locationState.id) return <Details moveId={locationState.id} />
    else return <Navigate replace to={ABILITIES_PATHS.home} />
  }

  return (
    <Box sx={styles.container}>
      <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
        <Routes>
          <Route path={MOVES_PATHS.home} element={<Home />} />
          <Route path={MOVES_PATHS.details} element={<DetailsElement />} />
          <Route
            path="*"
            element={<Navigate replace to={MOVES_PATHS.home} />}
          />
        </Routes>
      </Suspense>
    </Box>
  )
}

export default Dashboard
