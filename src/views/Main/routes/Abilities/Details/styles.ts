import { Theme } from '@mui/material'
import { createSxStyles } from '@pokemon-portal/theme'

import { useStyles as sharedStyles } from '../styles'

export const useStyles = (theme: Theme) => {
  return createSxStyles({
    ...sharedStyles(theme),
    gridContainer: { height: '92%' },

    list: { display: 'flex', flexDirection: 'column', height: '20%', paddingTop: 0 },
    pokemonListGrid: { height: '100%' },
    pokemonList: { height: '100%' },
    listItem: { ...sharedStyles(theme).listItem, paddingTop: 0 },
  })
}
