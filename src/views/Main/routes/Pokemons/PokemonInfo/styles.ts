import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import sharedStyles from '../../sharedStyles'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    card: { width: '100%', flex: 1, height: '100%', overflow: 'auto' },
    cardContent: { height: '100%', width: '100%', display: 'flex', flexDirection: 'column' },
    avatar: {
      width: theme.spacing(30),
      height: theme.spacing(30),
      margin: `0px ${theme.spacing(1)}`,
    },
    typeChip: { marginRight: theme.spacing(1) },
    list: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    moveList: { display: 'flex', flexDirection: 'column', flex: 1 },
    cardHeaderTitle: { fontSize: 'xx-large' },
    moveCard: {
      // width: '90%',
      // filter: theme.palette.mode === 'dark' ? 'brightness(1.2)' : undefined,
      marginTop: theme.spacing(2),
    },
    moveCardContent: { paddingTop: 0, display: 'flex' },
    moveCardHeader: {
      '.MuiCardHeader-action': { height: '100%', margin: 0, alignSelf: 'center' },
    },
    abilityAnchor: {
      fontSize: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer',
      textTransform: 'none',
      marginRight: theme.spacing(0.5),
      '&:hover': { color: theme.palette.primary.main },
    },
  })
