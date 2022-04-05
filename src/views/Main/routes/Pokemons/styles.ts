import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import sharedStyles from '../sharedStyles'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    patientsGrid: { display: 'flex', flexDirection: 'colunm' },
    progressContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    pokemonList: { height: '100%' },
  })
