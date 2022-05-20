import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import { useStyles as sharedStyles } from '../styles'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    ...sharedStyles(theme),
    gridContainer: { height: '92%' },
    list: { display: 'flex', flexDirection: 'column', height: '20%', paddingTop: 0 },
    pokemonListGrid: { height: '100%' },
    pokemonList: { height: '100%' },
    typeChip: { marginRight: theme.spacing(1) },
    listItemText: { alignItems: 'flex-start' },
    listItem: { ...sharedStyles(theme).listItem, paddingTop: 0 },
  })
