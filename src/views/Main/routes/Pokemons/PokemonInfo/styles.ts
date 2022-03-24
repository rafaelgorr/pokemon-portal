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
      marginRight: theme.spacing(2),
    },
    typeChip: { marginRight: theme.spacing(1) },
    listeItemText: {
      '.MuiListItemText-primary': {},
      '.MuiListItemText-secondary': {},
    },
    list: { display: 'flex', flexDirection: 'column', flex: 1 },
    moveList: { display: 'flex', flexDirection: 'column', flex: 1 },
    cardHeaderTitle: { fontSize: 'xx-large' },
    moveCard: { width: '50%', filter: 'brightness(1.2)' },
    moveCardContent: { paddingTop: 0 },
    moveCardHeader: { '.MuiCardHeader-action': { height: '100%', margin: 0, alignSelf: 'center' } },
  })
