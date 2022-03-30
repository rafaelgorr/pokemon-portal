import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/src/views/theme'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    selected: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,

      '& .MuiTypography-root': {
        fontWeight: 'bold',
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.contrastText,
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    list: {
      flex: 1,
      flexDirection: 'column',
      display: 'flex',
      padding: theme.spacing(1),
      '& .MuiListItem-button:not(:last-of-type)': {
        marginBottom: theme.spacing(1),
      },
    },
    listItem: {
      overflowX: 'hidden',

      paddingLeft: theme.spacing(1.5),
    },
    miniListItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // overflowX: 'hidden',
      cursor: 'pointer',
      marginBottom: theme.spacing(1),
    },
    miniItemIcon: {
      fontSize: 50,
      color: 'rgba(0,0,0,0)',
    },
    miniItemLabelSelected: { color: theme.palette.primary.main },
    miniItemLabel: { color: 'grey' },
    grow: { flex: 1 },
  })
