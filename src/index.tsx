import '@pokemon-portal/theme/index.global.scss'
import 'intersection-observer'

import enUS from 'date-fns/locale/en-US'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import smoothscroll from 'smoothscroll-polyfill'

import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorDialog } from '@pokemon-portal/components'
import {
  actions as errorActions,
  selectors as errorSelectors,
} from '@pokemon-portal/store/ui/error'
import { selectors } from '@pokemon-portal/store/ui/theme'

import { browser, SUPPORTED_BROWSERS } from './constants/browsers'
import { store, useAppSelector } from './store'
import { App } from './views'
import BrowserIncompatible from './views/BrowserIncompatible'
import { theme } from './views/theme'

smoothscroll.polyfill()

const isValidBrowser = browser.satisfies(SUPPORTED_BROWSERS)

interface ConnnectedAdmProps {}

const ConnectedAdm = (props: ConnnectedAdmProps) => {
  const { mode, error } = useAppSelector((state) => ({
    mode: selectors.getMode(state.ui.theme),
    error: errorSelectors.getError(state.ui.error),
  }))

  const dispatch = useDispatch()

  const themeWithMode = React.useMemo(() => theme(mode), [mode])
  return (
    <ThemeProvider theme={themeWithMode}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enUS}>
        <BrowserRouter>
          <App />
          <ErrorDialog error={error} setError={(error) => dispatch(errorActions.setError(error))} />
        </BrowserRouter>
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

const root = document.getElementById('root')

if (root) {
  const clientRoot = createRoot(root)

  if (isValidBrowser) {
    clientRoot.render(<Root />)
  } else {
    clientRoot.render(<BrowserIncompatible />)
  }
}
