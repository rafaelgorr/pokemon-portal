import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import { useStyles as sharedStyles } from '../styles'

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
    list: { display: 'flex', flexDirection: 'column', height: '20%' },
    pokemonList: { height: '75%', width: '25%' },
    typeChip: { marginRight: theme.spacing(1) },
  })
