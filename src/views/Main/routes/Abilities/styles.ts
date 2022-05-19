import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import sharedStyles from '../sharedStyles'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    progressContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
  })