import { PaletteMode, PaletteOptions } from '@mui/material'
import green from '@mui/material/colors/green'
import red from '@mui/material/colors/red'
import yellow from '@mui/material/colors/yellow'
import { createTheme } from '@mui/material/styles'
import { SxProps, Theme } from '@mui/system'
import { CSSProperties } from '@mui/system/CSSProperties'

export const defaultToobarHeight = 64

export const drawerWidth = 100
export const toolbarHeight = '124px'

export const flexColumn: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const getPrimaryColor = (mode: PaletteMode) =>
  mode === 'dark' ? '#0075BE' : '#0075BE'
const getSecondaryColor = (mode: PaletteMode) =>
  mode === 'dark' ? '#D5A100' : '#D5A100'

const getPalett = (mode: PaletteMode): PaletteOptions => ({
  mode,
  primary: {
    main: getPrimaryColor(mode),
    contrastText: '#D5A100',
  },
  secondary: {
    main: getSecondaryColor(mode),
    contrastText: '#fafafa',
  },
  error: {
    main: red[500],
  },
  success: {
    main: green[500],
  },
  info: { main: '#fafafa' },
  warning: {
    main: yellow['300'],
  },
})

export const theme = (mode: 'dark' | 'light') =>
  createTheme({
    palette: getPalett(mode),
    mixins: {
      toolbar: {
        minHeight: defaultToobarHeight,
      },
    },
    typography: {
      fontSize: 13,
      fontFamily: 'Helvetica',
    },
    components: {
      MuiCard: {
        styleOverrides: {},
      },
      MuiCssBaseline: {
        styleOverrides: {
          '&::-webkit-scrollbar': {
            backgroundColor: mode === 'dark' ? '#121212' : 'white',
            width: '7px',
          },
          '&::-webkit-scrollbar-track': {
            // WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            // borderRadius: '10px',
            // backgroundColor: 'black',
          },
          '&::-webkit-scrollbar-thumb': {
            background: getPrimaryColor(mode),
            borderRadius: '50px',
          },
          '*': {
            transition: 'background-color 0.1s linear',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px white inset',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40,
          },
        },
      },
    },
  })

export type SxTheme = Record<string, SxProps<Theme>>

export const createSxStyles = <T extends SxTheme>(obj: T) => obj
