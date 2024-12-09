import { Theme } from '@mui/material'
import {
  createSxStyles,
  drawerWidth,
  toolbarHeight,
} from '@pokemon-portal/src/views/theme'

export const useStyles = (theme: Theme) => {
  const drawerClosedWidth = theme.spacing(0)
  const hover = '&:hover'
  return createSxStyles({
    grow: {
      flexGrow: 1,
    },
    collapseContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      [hover]: { backgroundColor: 'white' },
    },
    title: {
      textDecoration: 'none',
      color: 'inherit',
    },
    container: {
      backgroundColor: 'white',
      height: '100vh',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    contentContainer: {
      marginLeft: drawerClosedWidth,
      flexDirection: 'column',
      paddingBottom: theme.spacing(3),
      paddingLeft: 0,
      width: `calc(100% - ${drawerClosedWidth}px)`,
      maxHeight: `calc(100vh - ${toolbarHeight}px)`,
      height: `calc(100vh - ${toolbarHeight}px)`,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        bgcolor:
          theme.palette.mode === 'dark' ? 'background.default' : 'whitesmoke',
      },
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
    iconLabel: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0px',
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: drawerClosedWidth,
      [theme.breakpoints.up('sm')]: {
        width: drawerClosedWidth,
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
      height: 102,
      cursor: 'pointer',
    },
    headerLogo: { width: '90%', height: 'auto' },
  })
}
