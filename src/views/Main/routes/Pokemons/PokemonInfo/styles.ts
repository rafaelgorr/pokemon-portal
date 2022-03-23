import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import sharedStyles from '../../sharedStyles'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    paper: { width: '100%', flex: 1, height: '100%', overflow: 'auto' },
    avatar: { width: theme.spacing(30), height: theme.spacing(30), marginRight: theme.spacing(2) },
    typeChip: { marginRight: theme.spacing(1) },
    listeItemText: {
      '.MuiListItemText-primary': {},
      '.MuiListItemText-secondary': {},
    },
  })
