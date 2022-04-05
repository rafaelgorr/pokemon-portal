import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { LightMode, ModeNight } from '@mui/icons-material'
import { Box, CircularProgress, CssBaseline, IconButton } from '@mui/material'
import { useTheme } from '@mui/system'
import DrawerLogo from '@pokemon-portal/assets/logo.png'
import { AppBar, Drawer, DrawerItem } from '@pokemon-portal/components'
import PokeAvatar from '@pokemon-portal/src/components/atoms/PokeAvatar'

import connect, { ConnectedProps } from './connect'
import useStyles from './styles'

export const PATHS = {
  pokemons: '/pokemons',
  moves: '/moves',
  abilities: '/abilities',
}

const Pokemons = lazy(() => import('./routes/Pokemons/route'))
const Moves = lazy(() => import('./routes/Moves/route'))
const Abilities = lazy(() => import('./routes/Abilities/route'))

const drawerListItems: DrawerItem[] = [
  { label: 'Pokemons', path: PATHS.pokemons, Icon: PokeAvatar, Component: Pokemons },
  { label: 'Moves', path: PATHS.moves, Icon: PokeAvatar, Component: Moves },
  { label: 'Abilities', path: PATHS.abilities, Icon: PokeAvatar, Component: Abilities },
]

type ExtendedProps = ConnectedProps

interface Props extends ExtendedProps {}

const Main = (props: Props) => {
  const styles = useStyles(useTheme())

  const { mode, toggleDrawer, drawerOpen } = props

  return (
    <Box sx={styles.pageContainer}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={styles.appBar}
        onNavClick={() => toggleDrawer()}
        title={
          <Box display="flex">
            <Box sx={{ flexGrow: 6 }} />
          </Box>
        }
        actions={
          <>
            {process.env.NODE_ENV === 'development' && (
              <IconButton onClick={() => props.setMode(mode === 'light' ? 'dark' : 'light')}>
                {mode === 'light' ? <LightMode sx={{ color: 'white' }} /> : <ModeNight />}
              </IconButton>
            )}
          </>
        }
      />
      <Drawer
        toggleDrawer={toggleDrawer}
        drawerOpen={drawerOpen}
        drawerListItems={drawerListItems}
        logo={DrawerLogo}
      />
      <Box sx={styles.pageContent} component="main">
        <Suspense fallback={<CircularProgress sx={styles.circularProgress} />}>
          <Routes>
            {drawerListItems.map((dI) => (
              <Route key={dI.path} path={dI.path + '/*'} element={<dI.Component />} />
            ))}
            <Route path="*" element={<Navigate replace to={PATHS.pokemons} />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  )
}

export default connect(Main)
