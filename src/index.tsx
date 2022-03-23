import '@pokemon-portal/theme/index.global.scss'

import enUS from 'date-fns/locale/en-US'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider, useDispatch } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorDialog } from '@pokemon-portal/components'
import {
  actions as errorActions,
  selectors as errorSelectors
} from '@pokemon-portal/store/ui/error'
import { selectors } from '@pokemon-portal/store/ui/theme'

import { browser, SUPPORTED_BROWSERS } from './constants/browsers'
import { store, useAppSelector } from './store'
import { App } from './views'
import BrowserIncompatible from './views/BrowserIncompatible'
import { theme } from './views/theme'

const isValidBrowser = browser.satisfies(SUPPORTED_BROWSERS)

const root = document.getElementById('root')

const rendered = root?.hasChildNodes() ? hydrate : render

interface Props {}

const ConnectedAdm = (props: Props) => {
  const { mode, error } = useAppSelector((state) => ({
    mode: selectors.getMode(state.ui.theme),
    error: errorSelectors.getError(state.ui.error),
  }))

  const dispatch = useDispatch()

  const themeWithMode = React.useMemo(() => theme(mode), [mode])
  return (
    <ThemeProvider theme={themeWithMode}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
        <HashRouter>
          <App />
          <ErrorDialog error={error} setError={(error) => dispatch(errorActions.setError(error))} />
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

interface Props {}

const Root = (props: Props) => {
  return (
    <Provider store={store}>
      <ConnectedAdm />
    </Provider>
  )
}

if (isValidBrowser) {
  rendered(<Root />, root)
} else {
  rendered(<BrowserIncompatible />, root)
}
