import { Theme } from '@mui/material/styles'
import { createSxStyles } from '@pokemon-portal/src/views/theme'

export const useStyles = (theme: Theme) =>
  createSxStyles({
    grow: {
      flexGrow: 1,
    },
    nav: {
      marginRight: theme.spacing(2),
    },
  })
