import React, { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { LightMode, ModeNight } from '@mui/icons-material'
import { Box, CircularProgress, CssBaseline, IconButton } from '@mui/material'
import { useTheme } from '@mui/system'
import DrawerLogo from '@pokemon-portal/assets/logo.png'
import { AppBar, Drawer, DrawerItem, PokeballIcon } from '@pokemon-portal/components'

import connect, { ConnectedProps } from './connect'
import useStyles from './styles'

export const PATHS = {
  pokemons: '/pokemons',
  chat: '/chat',
  notifications: '/notifications',
}

const Pokemons = lazy(() => import('./routes/Pokemons/route'))

const drawerListItems: DrawerItem[] = [
  { label: 'Pokemons', path: PATHS.pokemons, Icon: PokeballIcon },
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
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path={PATHS.pokemons + '/*'} element={<Pokemons />} />
            <Route path="*" element={<Navigate replace to={PATHS.pokemons} />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  )
}

export default connect(Main)